package com.dvastarter;

import android.app.Application;

import com.dvastarter.activity.ActivityStarterReactPackage;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.devstepbcn.wifi.AndroidWifiPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.pgsqlite.SQLitePluginPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static final String JS_BUNDLE_NAME = "index.android.bundle";

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }


    /**
     * Returns the name of the bundle in assets.
     */
    @Override
    protected String getBundleAssetName() {
      return JS_BUNDLE_NAME;
    }


    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new ActivityStarterReactPackage(),
          new MainReactPackage(),
            new AsyncStoragePackage(),
            new SvgPackage(),
            new RSSignatureCapturePackage(),
            new LinearGradientPackage(),
            new AndroidWifiPackage(),
            new SplashScreenReactPackage(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
        new SQLitePluginPackage(),
        new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
