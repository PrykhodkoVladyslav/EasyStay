using AutoMapper;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.MediatR.GuestInfos.Commands.Create;

namespace EasyStay.Application.Models.GuestInfos;

public class CreateGuestInfoDto : IMapWith<CreateGuestInfoCommand> {
	public int AdultCount { get; set; }

	public int ChildCount { get; set; }



	public void Mapping(Profile profile) {
		profile.CreateMap<CreateGuestInfoDto, CreateGuestInfoCommand>();
	}
}
