using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.RoomVariants.Commands.Create;

public class CreateRoomVariantCommandHandler(
	IEasyStayDbContext context,
	IMediator mediator
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

			await mediator.Send(request.Guest, cancellationToken);
			await mediator.Send(request.BedInfo, cancellationToken);

			await transaction.CommitAsync(cancellationToken);
		}
		catch {
			await transaction.RollbackAsync(cancellationToken);
		}

		return entity.Id;
	}
}
