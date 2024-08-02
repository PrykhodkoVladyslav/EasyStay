using Booking.Application.MediatR.Addresses.Commands.Create;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.MediatR.Hotels.Commands.Create;

public class CreateHotelCommand : IRequest<long> {
	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public bool? IsArchived { get; set; }

	public CreateAddressCommand Address { get; set; } = null!;

	public long TypeId { get; set; }

	public IEnumerable<IFormFile> Photos { get; set; } = null!;
}