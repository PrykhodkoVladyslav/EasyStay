using EasyStay.Application.MediatR.BedInfos.Commands;
using EasyStay.Application.MediatR.GuestInfos.Commands.Create;
using MediatR;

namespace EasyStay.Application.MediatR.RoomVariants.Commands.Create;

public class CreateRoomVariantCommand : IRequest<long> {
	public decimal Price { get; set; }

	public decimal? DiscountPrice { get; set; }

	public long RoomId { get; set; }

	public CreateGuestInfoCommand Guest { get; set; } = null!;

	public CreateBedInfoCommand BedInfo { get; set; } = null!;
}
