package com.adaranet.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.adaranet.model.Person;
import com.adaranet.service.PersonService;

@Controller
public class PersonController {

	Logger logger = Logger.getLogger(getClass());

	@Autowired
    private PersonService personService;

	@Autowired
	private Neo4jTemplate template;

	@RequestMapping(value = "/firstblood", method = RequestMethod.GET)
	public ModelAndView listAllDevices(@ModelAttribute Person person, BindingResult result) {

		logger.info("Comes in inside listAllDevices()");

		List<Person> persons = new ArrayList<Person>();
		
		Person person1 = new Person();
		person.setFirstName("Vishvesh");
		person.setLastName("Deshmukh");
		persons.add(person1);
		
		Person newPerson = new Person();
		person.setFirstName("Karthi");
		person.setLastName("Subramaniam");
		persons.add(newPerson);
		
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("persons", persons);
		//deviceService.addDevice(device);
		//return new ModelAndView("redirect:/device.html");
		return new ModelAndView("devicesList", model);
	}

    @RequestMapping("/")
    public String index(Map<String, Object> map) {
    	
    	logger.info("Redirecting to index.jsp");
    	
        //map.put("person", new Person());
        //map.put("peopleList", personService.findAll().iterator());

        return "index";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @Transactional
    public String addPerson(@ModelAttribute("person") Person person) {

        personService.save(person);

        return "redirect:/people/";
    }

    @RequestMapping("/delete/{personId}")
    @Transactional
    public String deletePerson(@PathVariable("personId") Long personId) {

        personService.delete(personId);

        return "redirect:/people/";
    }
}
