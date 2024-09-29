using MediatR;

namespace EasyStay.Application.MediatR.Rooms.Commands.Create;

public class CreateRoomCommand : IRequest<long> {
	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public int Quentity { get; set; }

	public long HotelId { get; set; }

	public IEnumerable<long>? RentalPeriodIds { get; set; } = null!;
}
