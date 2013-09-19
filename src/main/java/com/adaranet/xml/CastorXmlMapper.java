package com.adaranet.xml;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.log4j.Logger;
import org.springframework.oxm.Marshaller;
import org.springframework.oxm.Unmarshaller;

public class CastorXmlMapper {
	
	protected static Logger logger = Logger.getLogger(CastorXmlMapper.class);
	
	private static Marshaller marshaller;
	private static Unmarshaller unmarshaller;
	
	public void setMarshaller(Marshaller marshaller) {
		CastorXmlMapper.marshaller = marshaller;
	}
	
	public void setUnmarshaller(Unmarshaller unmarshaller) {
		CastorXmlMapper.unmarshaller = unmarshaller;
	}

	public static void convertFromObjectToXML(Object object, String filepath) throws IOException {
		FileOutputStream os = null;
		try {
			logger.info("Converting Object To XML");
			os = new FileOutputStream(filepath);
			marshaller.marshal(object, new StreamResult(os));
		} finally {
			logger.info("Converted Object To XML");
			if (os != null) {
				os.close();
			}
		}
	}
	 
	public static Object convertFromXMLToObjectFromXMLFile(String xmlfile) throws IOException {
		FileInputStream is = null;
		try {
			logger.info("Converting XML To Object From XML File.");
			is = new FileInputStream(xmlfile);
			return unmarshaller.unmarshal(new StreamSource(is));
		} finally {
			logger.info("Converted XML To Object From XML File.");
			if (is != null) {
				is.close();
			}
		}
	}
	
	public static Object convertFromXMLToObjectFromInputSource(Source xml) throws IOException {
		try {
			logger.info("Converting XML To Object");
			
			return unmarshaller.unmarshal(xml);
		} finally {
			logger.info("Converted XML To Object");
		}
	}
	
	
}
