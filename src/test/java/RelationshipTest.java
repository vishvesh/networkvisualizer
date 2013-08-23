import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.data.neo4j.support.node.Neo4jHelper;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.BeforeTransaction;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration
public class RelationshipTest {

	@Autowired
	private Neo4jTemplate template;
	
	@BeforeTransaction
	public void setUp() {
			Neo4jHelper.cleanDb(template);
	}
	
	@Test
	@Transactional
	public void testRelationship() {
		
	}
	
}
