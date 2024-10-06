using EasyStay.Application.Common.Mappings;
using EasyStay.Domain;

namespace EasyStay.Application.MediatR.GuestInfos.Queries.Shared;

public class GuestInfoVm : IMapWith<GuestInfo> {
	public int AdultCount { get; set; }

	public int ChildCount { get; set; }
}
