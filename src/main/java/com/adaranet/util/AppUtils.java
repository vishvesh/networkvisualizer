package com.adaranet.util;

import java.util.Random;

public class AppUtils {

	/**
	 * Returns a psuedo-random number between min and max, inclusive.
	 * The difference between min and max can be at most
	 * <code>Integer.MAX_VALUE - 1</code>.
	 *
	 * @param min Minimim value
	 * @param max Maximim value.  Must be greater than min.
	 * @return Integer between min and max, inclusive.
	 * @see java.util.Random#nextInt(int)
	 */
	public static int generateRandomInt(int max) {

	    // Usually this can be a field rather than a method variable
	    Random rand = new Random();

	    // nextInt is normally exclusive of the top value,
	    // so add 1 to make it inclusive
	    int randomNum = rand.nextInt(max - 0) + 1;

	    return randomNum;
	}
	
	/**
	 * Method to replace 'Device1-em0' type portnames,
	 * where 'Device1-' will be removed.
	 * @param portName
	 * @return portName/substring'd(filtered) portName
	 */
	public static String replacePorts(String portName) {
		if(!portName.trim().isEmpty()) {
			portName = portName.substring(portName.lastIndexOf('-') + 1);
		}
		return portName;
	}
	
}
