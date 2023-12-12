package restful.api;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import restful.bean.Result;
import restful.database.EM;
import restful.entity.User;

@Path("/account")
public class AccountAPI {
	
	@POST
	@Path("/login")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result login(User user) {
		List<User> result = EM.getEntityManager()
				.createNamedQuery("User.findByName", User.class)
				.setParameter("name", user.getName())
				.getResultList();
			
		if(!result.isEmpty()) {
			if(result.get(0).getPasswd().equals(user.getPasswd())) {
				return new Result(0, "登录成功", result.get(0), "");
			}
		}
		
		return new Result(-1, "用户名或密码错误", user, "");
	}
	
	@POST
	@Path("/getSingleUser")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result getSingleUser(User user) {
		List<User> result = EM.getEntityManager()
				.createNamedQuery("User.findByName", User.class)
				.setParameter("name", user.getName())
				.getResultList();
			
		if(!result.isEmpty()) {
			return new Result(0, "获取成功", result.get(0), "");
		}
		
		return new Result(-1, "无此账户", user, "");
	}
	
	@POST
	@Path("/register")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result register(User user) {
		List<User> result = EM.getEntityManager()
				.createNamedQuery("User.findByName", User.class)
				.setParameter("name", user.getName())
				.getResultList();
		
		if(result.isEmpty()) {
			user.setId(0);
			user = EM.getEntityManager().merge(user);
			EM.getEntityManager().persist(user);
			EM.getEntityManager().getTransaction().commit();
			
			return new Result(0, "注册成功", "", "");
		}
		
		return new Result(-1, "用户名重复", "", "");
	}
	
	@POST
	@Path("/update")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result update(User user) {
		User result = EM.getEntityManager()
				.createNamedQuery("User.findByName", User.class)
				.setParameter("name", user.getName())
				.getSingleResult();
		
		user.setId(result.getId());
		user.setIdentity(result.getIdentity());
		
		if(user.getPasswd().equals("")) {
			user.setPasswd(result.getPasswd());
		}

		EM.getEntityManager().persist(EM.getEntityManager().merge(user));
		EM.getEntityManager().getTransaction().commit();
			
		return new Result(0, "更新成功", user, "");
	}
	
	@POST
	@Path("/remove")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result remove(User user) {
	    User result = EM.getEntityManager()
	            .createNamedQuery("User.findByName", User.class)
	            .setParameter("name", user.getName())
	            .getSingleResult();

	    EM.getEntityManager().remove(result);
        EM.getEntityManager().getTransaction().commit();
            
        return new Result(0, "删除成功", "", "");
	}

	@POST
	@Path("/getAll")
	@Consumes("application/json;charset=UTF-8")
	@Produces("application/json;charset=UTF-8")
	public Result getAll() {
		List<User> result = EM.getEntityManager()
				.createNamedQuery("User.findAll", User.class)
				.getResultList();
	    
	    return new Result(0, "获取成功", result, "");
	}

}
