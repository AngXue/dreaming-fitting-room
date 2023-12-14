package restful.api;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import restful.bean.Result;
import restful.database.EM;
import restful.entity.DressedCloth;
import restful.entity.User;

@Path("/dressedClothes")
public class DressedClothesAPI {
	
	@POST
	@Path("/add")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result addDressedCloth(DressedCloth dressedCloth) {
		dressedCloth = EM.getEntityManager().merge(dressedCloth);
		EM.getEntityManager().persist(dressedCloth);
		EM.getEntityManager().getTransaction().commit();

	    return new Result(0, "添加成功", "", "");
	}
	
	@POST
	@Path("/remove")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result removeDressedCloth(DressedCloth dressedCloth) {
		EM.getEntityManager().remove(EM.getEntityManager().merge(dressedCloth));
		EM.getEntityManager().getTransaction().commit();

	    return new Result(0, "删除成功", "", "");
	}
	
	@POST
	@Path("/update")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result updateDressedCloth(DressedCloth dressedCloth) {
		EM.getEntityManager().persist(EM.getEntityManager().merge(dressedCloth));
		EM.getEntityManager().getTransaction().commit();
		
	    return new Result(0, "更新成功", "", "");
	}
	
	@POST
	@Path("/getClothList")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result getUserDressedClothList(User user) {
		List<DressedCloth> result = EM.getEntityManager()
	    		.createNamedQuery("DressedCloth.findByBelongUserName", DressedCloth.class)
	            .setParameter("belongUserName", user.getName())
	            .getResultList();

	    return new Result(0, "获取成功", result, "");
	}
	
}
