using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.Application.MediatR.Rooms.Commands.Update;

public class UpdateRoomCommandHandler(
	IEasyStayDbContext context,
	ICurrentUserService currentUserService
) : IRequestHandler<UpdateRoomCommand> {

	public async Task Handle(UpdateRoomCommand request, CancellationToken cancellationToken) {
		var entity = await context.Rooms
			.Include(r => r.Hotel)
			.Include(r => r.RoomRentalPeriods)
			.FirstOrDefaultAsync(
				r => r.Id == request.Id && r.Hotel.RealtorId == currentUserService.GetRequiredUserId(),
				cancellationToken
			)
			?? throw new NotFoundException(nameof(Room), request.Id);

		entity.Area = request.Area;
		entity.NumberOfRooms = request.NumberOfRooms;
		entity.Quantity = request.Quentity;

		entity.RoomRentalPeriods.Clear();
		foreach (var rentalPeriodId in request.RentalPeriodIds ?? [])
			entity.RoomRentalPeriods.Add(new RoomRentalPeriod {
				RoomId = entity.Id,
				RentalPeriodId = rentalPeriodId
			});

		await context.SaveChangesAsync(cancellationToken);
	}
}
