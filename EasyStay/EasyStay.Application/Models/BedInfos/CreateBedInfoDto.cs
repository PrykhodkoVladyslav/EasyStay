using AutoMapper;
using EasyStay.Application.Common.Mappings;
using EasyStay.Application.MediatR.BedInfos.Commands;

namespace EasyStay.Application.Models.BedInfos;

public class CreateBedInfoDto : IMapWith<CreateBedInfoCommand> {
	public int SingleBedCount { get; set; }

	public int DoubleBedCount { get; set; }

	public int ExtraBedCount { get; set; }

	public int SofaCount { get; set; }

	public int KingsizeBedCount { get; set; }



	public void Mapping(Profile profile) {
		profile.CreateMap<CreateBedInfoDto, CreateBedInfoCommand>();
	}
}
