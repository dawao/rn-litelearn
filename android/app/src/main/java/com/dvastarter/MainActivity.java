package com.dvastarter;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "DvaStarter";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      super.onCreate(savedInstanceState);
    }
    /**
     * We override to provide launch options that we can read in JavaScript (see buildType).
     */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
          return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
        @Override
        protected Bundle getLaunchOptions() {
          Bundle launchOptions = new Bundle();
          launchOptions.putString("buildType", BuildConfig.BUILD_TYPE);
          return launchOptions;
        }
      };
    }
}
