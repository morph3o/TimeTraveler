//
//  SignUpPageViewController.swift
//  TimeTraveler
//
//  Created by Lukas Schmidt on 04.03.16.
//  Copyright © 2016 Lukas Schmidt. All rights reserved.
//

import UIKit

class SignUpPageViewController: UIPageViewController, StandardPageViewController, UIGestureRecognizerDelegate {
    var controllers:Array<UIViewController> = []
    var currentControllerIndex = 0
    
    var displayedController: UIViewController {
        return viewControllers![0]
    }


    override func viewDidLoad() {
        super.viewDidLoad()
        let keptVc: UIViewController = instantiateViewControllerWithIdentifier("enter_flight_controller")
        let mainVc: UIViewController = instantiateViewControllerWithIdentifier("enter_traveler_kind_controller")
        let tidiedOutVc: UIViewController = instantiateViewControllerWithIdentifier("enter_transport_controller")

                
        
        controllers = [keptVc, mainVc, tidiedOutVc]
//        let view: UIView = UIView.viewFromNibNamed("BackgroundBlurView", owner: self)
//        self.view.insertSubview(view, atIndex: 0)
        dataSource = self
        self.setViewControllers([controllers[0]], direction: UIPageViewControllerNavigationDirection.Forward, animated: false, completion: nil)
        navigationController?.interactivePopGestureRecognizer?.delegate = self
        stylePageControl()
    }
    
    func stylePageControl() {
        let pageControl = UIPageControl.appearance()
        pageControl.pageIndicatorTintColor = UIColor.lightGrayColor()
        pageControl.currentPageIndicatorTintColor = .orangeUIColor()
        pageControl.backgroundColor = UIColor.clearColor()
        
        self.view.layer.backgroundColor = UIColor.clearColor().CGColor
    }
}

extension SignUpPageViewController {
    func pageViewController(pageViewController: UIPageViewController, viewControllerBeforeViewController viewController: UIViewController) -> UIViewController? {
        return getNthNextController(viewController, nthIndexInxex: -1)
    }
    
    func pageViewController(pageViewController: UIPageViewController, viewControllerAfterViewController viewController: UIViewController) -> UIViewController? {
        return getNthNextController(viewController, nthIndexInxex: 1)
    }
    
    func presentationCountForPageViewController(pageViewController: UIPageViewController) -> Int {
        return controllers.count
    }
    
    func presentationIndexForPageViewController(pageViewController: UIPageViewController) -> Int {
        return 0
    }
}
