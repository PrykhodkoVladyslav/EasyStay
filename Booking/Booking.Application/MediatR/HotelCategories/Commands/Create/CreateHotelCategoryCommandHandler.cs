using Booking.Application.Interfaces;
using Booking.Domain;
using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Commands.Create;

public class CreateHotelCategoryCommandHandler(
	IBookingDbContext context
) : IRequestHandler<CreateHotelCategoryCommand, long> {

	public async Task<long> Handle(CreateHotelCategoryCommand request, CancellationToken cancellationToken) {
		var entity = new HotelCategory {
			Name = request.Name
		};

		await context.HotelCategories.AddAsync(entity, cancellationToken);
		await context.SaveChangesAsync(cancellationToken);

		return entity.Id;
	}
}
