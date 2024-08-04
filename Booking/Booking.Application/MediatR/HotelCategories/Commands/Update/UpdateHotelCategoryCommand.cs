using MediatR;

namespace Booking.Application.MediatR.HotelCategories.Commands.Update;

public class UpdateHotelCategoryCommand : IRequest {
	public long Id { get; set; }

	public string Name { get; set; } = null!;
}
