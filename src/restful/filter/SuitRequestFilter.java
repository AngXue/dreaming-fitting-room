package restful.filter;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;;

public class SuitRequestFilter implements ContainerRequestFilter, ContainerResponseFilter {

	@Override
	public void filter(ContainerRequestContext containerRequestContext,
	        ContainerResponseContext containerResponseContext) throws IOException {
		
	}

	@Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        
    }

}
