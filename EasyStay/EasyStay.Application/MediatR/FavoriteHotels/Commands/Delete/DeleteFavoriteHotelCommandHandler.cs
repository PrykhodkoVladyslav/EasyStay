using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EasyStay.Application.MediatR.FavoriteHotels.Commands.Delete;

public class DeleteFavoriteHotelCommandHandler(
	IEasyStayDbContext context,
	ICurrentUserService currentUserService
) : IRequestHandler<DeleteFavoriteHotelCommand> {

	public async Task Handle(DeleteFavoriteHotelCommand request, CancellationToken cancellationToken) {
		var deleted = await context.FavoriteHotels
			.Where(fh => fh.HotelId == request.HotelId && fh.CustomerId == currentUserService.GetRequiredUserId())
			.ExecuteDeleteAsync(cancellationToken);

		if (deleted == 0)
			throw new NotFoundException(nameof(FavoriteHotel), request.HotelId);
	}
}
