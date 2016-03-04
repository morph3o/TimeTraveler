//
//  FlightInformation.swift
//  TimeTraveler
//
//  Created by Lukas Schmidt on 04.03.16.
//  Copyright © 2016 Lukas Schmidt. All rights reserved.
//

import Foundation

enum LaguageType {
    case Handbag
    case BigBag(Int)
}

enum TravelSpeed {
    case Slow, Medium, Fast
}

enum TransportType {
    case PlublicTransport
    case Car
}

struct FlightReference {
    let boockingReferenceID: String
    var isValid = false
}

class TravelerInformation {
    //User Input
    var flightReference: FlightReference?
    var laguageType: LaguageType?
    var transportType: TransportType?
    
    
    //fetched Data
    var flightStatus: FlightStatus? {
        didSet {
            flightReference?.isValid = true
        }
    }
    
}
