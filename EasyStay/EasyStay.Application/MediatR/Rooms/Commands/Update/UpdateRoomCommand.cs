using MediatR;

namespace EasyStay.Application.MediatR.Rooms.Commands.Update;

public class UpdateRoomCommand : IRequest {
	public long Id { get; set; }

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public int Quentity { get; set; }

	public IEnumerable<long>? RentalPeriodIds { get; set; } = null!;
}
