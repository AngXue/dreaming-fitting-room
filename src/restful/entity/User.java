package restful.entity;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "T_User")
@NamedQueries({
    @NamedQuery(name = "User.findAll", query = "SELECT user FROM User user"),
    @NamedQuery(name = "User.findByName", query = "SELECT user FROM User user where user.name = :name")
})
public class User extends IdEntity{
	
	private String name;
	private int Identity = 0;
	private String gender;
	private String passwd;
	private String modelID;
	private String realName;
	
	public int getIdentity() {
		return Identity;
	}

	public void setIdentity(int identity) {
		Identity = identity;
	}
	
	public String getModelID() {
		return modelID;
	}
	
	public void setModelID(String modelID) {
		this.modelID = modelID;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public String getPasswd() {
		return passwd;
	}
	
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	
	public String getRealName() {
		return realName;
	}
	
	public void setRealName(String realName) {
		this.realName = realName;
	}

}