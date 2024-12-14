using AutoMapper;
using EasyStay.Application.Interfaces;
using EasyStay.Application.MediatR.BedInfos.Commands.Create;
using EasyStay.Application.MediatR.GuestInfos.Commands.Create;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.RoomVariants.Commands.Create;

public class CreateRoomVariantCommandHandler(
	IEasyStayDbContext context,
	IMediator mediator,
	IMapper mapper
) : IRequestHandler<CreateRoomVariantCommand, long> {

	public async Task<long> Handle(CreateRoomVariantCommand request, CancellationToken cancellationToken) {
		var entity = new RoomVariant {
			Price = request.Price,
			DiscountPrice = request.DiscountPrice,
			RoomId = request.RoomId
		};

		await context.RoomVariants.AddAsync(entity, cancellationToken);

		using var transaction = await context.BeginTransactionAsync(cancellationToken);
		try {
			await context.SaveChangesAsync(cancellationToken);

			var guestCommand = mapper.Map<CreateGuestInfoCommand>(request.GuestInfo);
			guestCommand.RoomVariantId = entity.Id;
			await mediator.Send(guestCommand, cancellationToken);

			var bedInfo = mapper.Map<CreateBedInfoCommand>(request.BedInfo);
			bedInfo.RoomVariantId = entity.Id;
			await mediator.Send(bedInfo, cancellationToken);

			await transaction.CommitAsync(cancellationToken);
		}
		catch {
			await transaction.RollbackAsync(cancellationToken);
		}

		return entity.Id;
	}
}
