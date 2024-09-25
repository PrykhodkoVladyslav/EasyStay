using EasyStay.Application.Models.Address;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace EasyStay.Application.MediatR.Hotels.Commands.Update;

public class UpdateHotelCommand : IRequest {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public bool IsArchived { get; set; }

	public long RentalPeriodId { get; set; }

	public UpdateAddressDto Address { get; set; } = null!;

	public long CategoryId { get; set; }

	public IEnumerable<IFormFile> Photos { get; set; } = null!;
}