using MediatR;

namespace EasyStay.Application.MediatR.HotelAmenities.Commands.Update;

public class UpdateHotelAmenityCommand : IRequest {
	public long Id { get; set; }

	public string Name { get; set; } = null!;
}
