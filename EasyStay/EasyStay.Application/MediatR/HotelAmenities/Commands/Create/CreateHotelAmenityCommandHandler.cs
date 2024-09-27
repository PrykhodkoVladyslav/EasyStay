using EasyStay.Application.Interfaces;
using EasyStay.Domain;
using MediatR;

namespace EasyStay.Application.MediatR.HotelAmenities.Commands.Create;

public class CreateHotelAmenityCommandHandler(
	IEasyStayDbContext context
) : IRequestHandler<CreateHotelAmenityCommand, long> {

	public async Task<long> Handle(CreateHotelAmenityCommand request, CancellationToken cancellationToken) {
		var entity = new HotelAmenity {
			Name = request.Name,
		};

		await context.HotelAmenities.AddAsync(entity, cancellationToken);
		await context.SaveChangesAsync(cancellationToken);

		return entity.Id;
	}
}
