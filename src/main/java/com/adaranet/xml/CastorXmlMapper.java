package com.adaranet.xml;

import org.springframework.oxm.Marshaller;
import org.springframework.oxm.Unmarshaller;

public class CastorXmlMapper {
	
	private Marshaller marshaller;
	private Unmarshaller unmarshaller;
	
	public void setMarshaller(Marshaller marshaller) {
		this.marshaller = marshaller;
	}
	
	public void setUnmarshaller(Unmarshaller unmarshaller) {
		this.unmarshaller = unmarshaller;
	}

}
