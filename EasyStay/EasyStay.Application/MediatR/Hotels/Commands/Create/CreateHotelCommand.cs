using EasyStay.Application.MediatR.Addresses.Commands.Create;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace EasyStay.Application.MediatR.Hotels.Commands.Create;

public class CreateHotelCommand : IRequest<long> {
	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public bool? IsArchived { get; set; }

	public CreateAddressCommand Address { get; set; } = null!;

	public long CategoryId { get; set; }

	public IEnumerable<long>? RentalPeriodIds { get; set; } = null!;

	public IEnumerable<IFormFile> Photos { get; set; } = null!;
}
