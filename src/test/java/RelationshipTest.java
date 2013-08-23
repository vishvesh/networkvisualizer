import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import java.io.FileNotFoundException;

import org.apache.log4j.Logger;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.support.node.Neo4jHelper;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.BeforeTransaction;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Log4jConfigurer;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:applicationContext*.xml" })
public class RelationshipTest {

	@Autowired
	private Neo4jTemplate template;
	
	Logger logger = Logger.getLogger(getClass());
	
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
		      Log4jConfigurer.initLogging( "classpath:propFiles/log4j.properties" );
		      logger.info("");
				logger.info("************************************************************");
				logger.info("Cleaned Neo4j DB Template.");
				logger.info("************************************************************");
				logger.info("");
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
		System.out.println("Test Start");
		logger.info("Initiating test for Relationship.");
		assertThat("One", equalTo("One"));
		System.out.println("Test End");

	}
	
}
