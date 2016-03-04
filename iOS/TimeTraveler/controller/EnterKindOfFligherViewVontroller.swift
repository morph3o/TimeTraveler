//
//  EnterKindOfFligherViewVontroller.swift
//  TimeTraveler
//
//  Created by Lukas Schmidt on 04.03.16.
//  Copyright © 2016 Lukas Schmidt. All rights reserved.
//

import UIKit

class EnterKindOfFligherViewVontroller: EnteringViewController {
    var laguageType: LaguageType?
    var travelSpeed: TravelSpeed?
    
    func isValidInput() -> Bool {
        guard let _ = laguageType, let _ = travelSpeed else { return false }
        return true
    }
}
