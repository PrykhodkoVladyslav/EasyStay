using AutoMapper;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.MediatR.RentalPeriods.Queries.Shared;
using EasyStay.Domain;

namespace EasyStay.Application.MediatR.Rooms.Queries.Shared;

public class RoomVm : IMapWith<Room> {
	public long Id { get; set; }

	public double Area { get; set; }

	public int NumberOfRooms { get; set; }

	public int Quantity { get; set; }

	public IEnumerable<RentalPeriodVm> RentalPeriods { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<Room, RoomVm>()
			.ForMember(
				dest => dest.RentalPeriods,
				opt => opt.MapFrom(
					src => src.RoomRentalPeriods
						.Select(rrp => rrp.RentalPeriod)
						.ToArray()
				)
			);
	}
}
