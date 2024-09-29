using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.Rooms.Commands.Create;

public class CreateRoomCommandHandler(
	IEasyStayDbContext context
) : IRequestHandler<CreateRoomCommand, long> {

	public async Task<long> Handle(CreateRoomCommand request, CancellationToken cancellationToken) {
		var entity = new Room {
			Area = request.Area,
			NumberOfRooms = request.NumberOfRooms,
			Quantity = request.Quentity,
			HotelId = request.HotelId
		};

		entity.RoomRentalPeriods = (request.RentalPeriodIds ?? [])
			.Select(rpId => new RoomRentalPeriod {
				Room = entity,
				RentalPeriodId = rpId
			})
			.ToArray();

		await context.Rooms.AddAsync(entity, cancellationToken);

		await context.SaveChangesAsync(cancellationToken);

		return entity.Id;
	}
}
