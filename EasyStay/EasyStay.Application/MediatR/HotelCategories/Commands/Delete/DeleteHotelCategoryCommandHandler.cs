using EasyStay.Application.Common.Exceptions;
using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.HotelCategories.Commands.Delete;

public class DeleteHotelCategoryCommandHandler(
	IBookingDbContext context
) : IRequestHandler<DeleteHotelCategoryCommand> {

	public async Task Handle(DeleteHotelCategoryCommand request, CancellationToken cancellationToken) {
		var entity = await context.HotelCategories.FindAsync([request.Id], cancellationToken)
			?? throw new NotFoundException(nameof(HotelCategory), request.Id);

		context.HotelCategories.Remove(entity);
		await context.SaveChangesAsync(cancellationToken);
	}
}
