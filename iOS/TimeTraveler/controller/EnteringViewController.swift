//
//  EnteringViewController.swift
//  TimeTraveler
//
//  Created by Lukas Schmidt on 04.03.16.
//  Copyright © 2016 Lukas Schmidt. All rights reserved.
//

import UIKit

class EnteringViewController: UIViewController {
    var flightInformation: FlightInformation!
    
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if let destinationController = segue.destinationViewController as? EnteringViewController {
            destinationController.flightInformation = flightInformation
        }
    }
}
