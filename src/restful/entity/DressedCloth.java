package restful.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name = "T_DressedCloth")
@NamedQueries({
    @NamedQuery(name = "DressedCloth.findByBelongUserName", query = "SELECT d FROM DressedCloth d "
    		+ "WHERE d.belongUserName = :belongUserName")
})
public class DressedCloth {
	
	@Id
    private int id;
	private int zIndex;
	private String belongUserName;
	
	// 从Cloth继承的字段
    private String clothID;
    private String clothName;
    private String clothPrice;
    private String clothGender;
    private String clothCategoryName;
    private String clothImageName;
    
	public int getzIndex() {
		return zIndex;
	}
	
	public void setzIndex(int zIndex) {
		this.zIndex = zIndex;
	}
	
	public String getBelongUserName() {
		return belongUserName;
	}
	
	public void setBelongUserName(String belongUserName) {
		this.belongUserName = belongUserName;
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getClothID() {
		return clothID;
	}
	
	public void setClothID(String clothID) {
		this.clothID = clothID;
	}
	
	public String getClothName() {
		return clothName;
	}
	
	public void setClothName(String clothName) {
		this.clothName = clothName;
	}
	
	public String getClothPrice() {
		return clothPrice;
	}
	
	public void setClothPrice(String clothPrice) {
		this.clothPrice = clothPrice;
	}
	
	public String getClothGender() {
		return clothGender;
	}
	
	public void setClothGender(String clothGender) {
		this.clothGender = clothGender;
	}
	
	public String getClothCategoryName() {
		return clothCategoryName;
	}
	
	public void setClothCategoryName(String clothCategoryName) {
		this.clothCategoryName = clothCategoryName;
	}
	
	public String getClothImageName() {
		return clothImageName;
	}
	
	public void setClothImageName(String clothImageName) {
		this.clothImageName = clothImageName;
	}
    
}
