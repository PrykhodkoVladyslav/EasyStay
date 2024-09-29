using MediatR;

namespace EasyStay.Application.MediatR.HotelAmenities.Commands.Create;

public class CreateHotelAmenityCommand : IRequest<long> {
	public string Name { get; set; } = null!;
}
