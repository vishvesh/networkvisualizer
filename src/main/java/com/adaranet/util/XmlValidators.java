package com.adaranet.util;

import java.io.File;
import java.io.InputStream;
import java.net.URL;

import javax.xml.XMLConstants;
import javax.xml.transform.Source;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.apache.log4j.Logger;

public class XmlValidators {
	
	/**
	 * @author vdeshmukh
	 */
	
	private static Logger logger = Logger.getLogger(XmlValidators.class);
	
	/**
	 * Consumes an XML and XSD from InputStream 
	 * in order to validate the XML against XSD.
	 * 
	 * @param xml
	 * @param xsd
	 * @return boolean -> true if valid XML, else false.
	 * @throws Exception
	 */
	public static boolean validateXMLAgainstXSDFromXMLInputStream(InputStream xml, InputStream xsd) throws Exception {
	    try {
	        SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
	        Schema schema = factory.newSchema(new StreamSource(xsd));
	        Validator validator = schema.newValidator();
	        validator.validate(new StreamSource(xml));
	        return true;
	    } catch(Exception ex) {
	        return false;
	    }
	}
	
	/**
	 * The schema factory constant is the string http://www.w3.org/2001/XMLSchema which defines XSDs. 
	 * The above code validates a WAR deployment descriptor against the URL http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd,
	 * but we need to validate against a local file.
	 * 
	 * @return boolean -> true if valid XML, else false.
	 * @throws Exception
	 */
	public static boolean validateXMLAgainstXSDFromXMLFile() throws Exception {
		URL schemaFile = new URL("http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd");
		Source xmlFile = new StreamSource(new File("web.xml"));
		SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
		Schema schema = schemaFactory.newSchema(schemaFile);
		Validator validator = schema.newValidator();
		try {
		  validator.validate(xmlFile);
		  logger.info(xmlFile.getSystemId() + " is valid");
		} catch (Exception e) { //throws SAXException actually.
		  logger.info(xmlFile.getSystemId() + " is NOT valid");
		  logger.info("Reason: " + e.getLocalizedMessage());
		  return false;
		}
	  return true;
	}
}
