using EasyStay.Application.Common.Mappings;
using EasyStay.Domain;

namespace EasyStay.Application.MediatR.RoomAmenities.Queries.Shared;

public class RoomAmenityVm : IMapWith<RoomAmenity> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;
}
