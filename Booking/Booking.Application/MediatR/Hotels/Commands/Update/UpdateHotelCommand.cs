using Booking.Application.Models.Address;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.MediatR.Hotels.Commands.Update;

public class UpdateHotelCommand : IRequest {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public UpdateAddressDto Address { get; set; } = null!;

	public long TypeId { get; set; }

	public IEnumerable<IFormFile> Photos { get; set; } = null!;
}