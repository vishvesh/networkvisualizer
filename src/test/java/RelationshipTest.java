import static org.junit.Assert.assertThat;

import org.aspectj.lang.annotation.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.support.node.Neo4jHelper;
import org.springframework.data.neo4j.transaction.Neo4jTransactional;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.BeforeTransaction;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.relationships.ConnectedDevices;
import com.adaranet.service.DeviceService;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.junit.Assert.assertThat;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext*.xml" })
public class RelationshipTest {

	@Autowired
	private Neo4jTemplate template;
	
	@Autowired
	private DeviceService deviceService;
	
	//Logger logger = Logger.getLogger(getClass());
	
	/*@BeforeClass
	public static void beforeLoad() {
	try {
	      Log4jConfigurer.initLogging( "classpath:propFiles/log4j.properties" );
	    }
	    catch( FileNotFoundException ex ) {
	      System.err.println( "Cannot Initialize log4j" );
	    }
	}*/
	
	@BeforeTransaction
	public void setUp() {
		try {
			Neo4jHelper.cleanDb(template);
		      /*Log4jConfigurer.initLogging( "classpath:propFiles/log4j.properties" );
		      logger.info("");
				logger.info("************************************************************");
				logger.info("Cleaned Neo4j DB Template.");
				logger.info("************************************************************");
				logger.info("");*/
		    }
		    catch( Exception ex ) {
		      System.err.println( "Exception : "+ex );
		      ex.printStackTrace();
		    }	
	}
	
	@Test
	@Transactional
	public void testRelationship() {
		
		//logger.info("Initiating test for Relationship.");
		
		/*FirstEntity persistedEntity = template.findOne(firstEntity.getId(), FirstEntity.class);

		assertThat(persistedEntity.getId(), notNullValue());
		assertThat(persistedEntity.getValue(), equalTo(firstEntity.getValue()));
		assertThat(persistedEntity.getEntityRelationships(), hasSize(3));*/
		
		Device one = new Device("One");
		Device two = new Device("Two");
		
		deviceService.save(one);
		deviceService.save(two);
		
		Iterable<Device> devices = deviceService.findAll();
		
		for (Device device : devices) {
			//logger.info("Device Name : "+device.getDeviceName());
			System.out.println("Device Name : "+device.getDeviceName());
		}
		
		//System.out.println("ONe's ID : "+one.getId());
		//Device found = template.findOne(one.getId(), Device.class);
		
		//System.out.println("Found prop by val : "+found.getId());
		
		//one.connectsTo(two, "Sample Connection");
		//ConnectedDevices c = template.createRelationshipBetween(one, two, ConnectedDevices.class, "CONNECTED_TO", false);
		//template.save(c);
		
		//one.connectsToDevice(two);
		//deviceService.save(one);
		
		System.out.println("After executing all the tests!");
		
		Device theDevice = deviceService.findByPropertyValue("deviceName", "One");
		System.out.println("FOUND THE DEVICE : "+theDevice.getDeviceName());
				
		//System.out.println("Test Start");
		//logger.info("Initiating test for Relationship.");
		//assertThat("One", equalTo("One"));
		//System.out.println("Test End");

	}
	
	@Test
	public void testMethod() {
		System.out.println("TESTING METHOF 2");
		//Device theDevice = deviceService.findByPropertyValue("deviceName", "One");
		//System.out.println("FOUND THE DEVICE in METHOD 2: "+theDevice.getDeviceName());
		
		Iterable<Device> devices = deviceService.findAll();
		for (Device device : devices) {
			System.out.println("ALL DEVICES IN THE LOOP : "+device.getDeviceName());
		}
	}
	
}
