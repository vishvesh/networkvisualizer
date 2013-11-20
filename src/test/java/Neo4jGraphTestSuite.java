import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.transaction.annotation.Transactional;

import com.adaranet.model.Device;
import com.adaranet.service.DeviceService;
import com.adaranet.service.PortsService;
//import org.springframework.data.neo4j.transaction.Neo4jTransactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:springConfig/applicationContext*.xml" })
public class Neo4jGraphTestSuite {

	@Autowired
	private Neo4jTemplate template;
	@Autowired
	private DeviceService deviceService;
	@Autowired
	private PortsService portsService;
	
	private static int NUMBER_OF_DEVICES = 5;
	//private static Logger logger = Logger.getLogger(getClass());

	@Test
	@Transactional
	public void beforeLoad() {
	try {
			System.out.println("***** Cleaning Neo4jDatabase! *****");
			if(deviceService.count() > 0) {
	    		System.out.println("Devices present in the Graph : Cleaning them! : Count : "+deviceService.count());
				deviceService.deleteAll();
			} else {
				System.out.println("No Devices Present in the Graph!");
			}
	    	if(portsService.count() > 0) {
	    		System.out.println("Ports present in the Graph : Cleaning them! : Count : "+portsService.count());
	    		portsService.deleteAll();
	    	} else {
	    		System.out.println("No Ports Present in the Graph!");
	    	}
			System.out.println("***** Neo4jDatabase Cleaned Successfully! *****");
			//Log4jConfigurer.initLogging( "classpath:propFiles/log4j.properties" );
	    }
	    catch( Exception ex ) {
	      ex.printStackTrace();
	    }
	}

	@Test
	@Transactional
	public void showDevices() throws Exception {
		System.out.println("TESTING METHOD showDevices()");
		Iterable<Device> devices = deviceService.findAll();
		for (Device device : devices) {
			System.out.println("ALL DEVICES IN THE LOOP : "+device.getDeviceName());
		}
	}
	
	@Test
	@Transactional
	public void createDevices() throws Exception {
		System.out.println("TESTING METHOD createDevices()");
		for(int i = 0; i < NUMBER_OF_DEVICES; i++) {
			System.out.println(i);
		}
	}
	
	/*@Test
	@Transactional
	public void testRelationship() throws Exception {	
		//logger.info("Initiating test for Relationship.");
		
		FirstEntity persistedEntity = template.findOne(firstEntity.getId(), FirstEntity.class);

		assertThat(persistedEntity.getId(), notNullValue());
		assertThat(persistedEntity.getValue(), equalTo(firstEntity.getValue()));
		assertThat(persistedEntity.getEntityRelationships(), hasSize(3));
		
		Device one = new Device("One");
		Device two = new Device("Two");
		
		deviceService.save(one);
		deviceService.save(two);
		
		Iterable<Device> devices = deviceRepository.findAll();
		
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
		
		Device theDevice = deviceRepository.findByPropertyValue("deviceName", "One");
		if(theDevice != null)
			System.out.println("FOUND THE DEVICE : "+theDevice.getDeviceName());
				
		//System.out.println("Test Start");
		logger.info("Initiating test for Relationship.");
		assertThat("One", equalTo("One"));
		//System.out.println("Test End");
	}*/
	
}
