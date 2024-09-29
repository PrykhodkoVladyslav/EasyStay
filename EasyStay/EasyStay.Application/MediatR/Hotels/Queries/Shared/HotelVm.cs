using AutoMapper;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.MediatR.Addresses.Queries.Shared;
using EasyStay.Application.MediatR.Breakfasts.Queries.Shared;
using EasyStay.Application.MediatR.HotelAmenities.Queries.Shared;
using EasyStay.Application.MediatR.HotelCategories.Queries.Shared;
using EasyStay.Domain;

namespace EasyStay.Application.MediatR.Hotels.Queries.Shared;

public class HotelVm : IMapWith<Hotel> {
	public long Id { get; set; }

	public string Name { get; set; } = null!;

	public string Description { get; set; } = null!;

	public TimeOnly ArrivalTimeUtc { get; set; }

	public TimeOnly DepartureTimeUtc { get; set; }

	public bool IsArchived { get; set; }

	public AddressVm Address { get; set; } = null!;

	public HotelCategoryVm Category { get; set; } = null!;

	public long RealtorId { get; set; }

	public IEnumerable<HotelAmenityVm> HotelAmenities { get; set; } = null!;

	public IEnumerable<BreakfastVm> Breakfasts { get; set; } = null!;

	public IEnumerable<HotelPhotoVm> Photos { get; set; } = null!;



	public void Mapping(Profile profile) {
		profile.CreateMap<Hotel, HotelVm>()
			.ForMember(
				dest => dest.ArrivalTimeUtc,
				opt => opt.MapFrom(src => TimeOnly.FromDateTime(src.ArrivalTimeUtc.DateTime))
			)
			.ForMember(
				dest => dest.DepartureTimeUtc,
				opt => opt.MapFrom(src => TimeOnly.FromDateTime(src.DepartureTimeUtc.DateTime))
			)
			.ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.HotelCategory))
			.ForMember(
				dest => dest.HotelAmenities,
				opt => opt.MapFrom(
					src => src.HotelHotelAmenities
						.Select(hha => hha.HotelAmenity)
						.ToArray()
				)
			)
			.ForMember(
				dest => dest.Breakfasts,
				opt => opt.MapFrom(
					src => src.HotelBreakfasts
						.Select(hb => hb.Breakfast)
						.ToArray()
				)
			);
	}
}
