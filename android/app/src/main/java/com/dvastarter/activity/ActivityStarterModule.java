package com.dvastarter.activity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.dvastarter.MainApplication;
import com.dvastarter.R;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;

import constacne.UiType;
import listener.Md5CheckResultListener;
import listener.UpdateDownloadListener;
import model.UiConfig;
import model.UpdateConfig;
import update.UpdateAppUtils;

/**
 * Expose Java to JavaScript. Methods annotated with {@link ReactMethod} are exposed.
 */
final class ActivityStarterModule extends ReactContextBaseJavaModule {

  ActivityStarterModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  /**
   * @return the name of this module. This will be the name used to {@code require()} this module
   * from JavaScript.
   */
  @Override
  public String getName() {
    return "ActivityStarter";
  }

  @ReactMethod
  void navigateToExample() {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      Intent intent = new Intent(activity, ExampleActivity.class);
      activity.startActivity(intent);
    }
  }

  @ReactMethod
  void navigateToPlayer() {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      Intent intent = new Intent(activity, SimplePlayer.class);
      activity.startActivity(intent);
    }
  }

  @ReactMethod
  void navigateToVideo() {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      Intent intent = new Intent(activity, JavaDemoActivity.class);
      activity.startActivity(intent);
    }
  }

  private String apkUrl = "http://118.24.148.250:8080/yk/update_signed.apk";
  private String updateTitle = "发现新版本V2.0.0";
  private String updateContent = "1、Kotlin重构版\n2、支持自定义UI\n3、增加md5校验\n4、更多功能等你探索";

  @ReactMethod
  void navigateToUpdate() {
    UpdateConfig updateConfig = new UpdateConfig();
    updateConfig.setCheckWifi(true);
    updateConfig.setNeedCheckMd5(true);
    updateConfig.setNotifyImgRes(R.drawable.ic_logo);

    UiConfig uiConfig = new UiConfig();
    uiConfig.setUiType(UiType.PLENTIFUL);

    UpdateAppUtils
      .getInstance()
      .apkUrl(apkUrl)
      .updateTitle(updateTitle)
      .updateContent(updateContent)
      .uiConfig(uiConfig)
      .updateConfig(updateConfig)
      .setMd5CheckResultListener(new Md5CheckResultListener() {
        @Override
        public void onResult(boolean result) {

        }
      })
      .setUpdateDownloadListener(new UpdateDownloadListener() {
        @Override
        public void onStart() {

        }

        @Override
        public void onDownload(int progress) {

        }

        @Override
        public void onFinish() {

        }

        @Override
        public void onError(Throwable e) {

        }
      })
      .update();
  }

  @ReactMethod
  void dialNumber(@NonNull String number) {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number));
      activity.startActivity(intent);
    }
  }

  @ReactMethod
  void getActivityName(@NonNull Callback callback) {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      callback.invoke(activity.getClass().getSimpleName());
    } else {
      callback.invoke("No current activity");
    }
  }

  @ReactMethod
  void getActivityNameAsPromise(@NonNull Promise promise) {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      promise.resolve(activity.getClass().getSimpleName());
    } else {
      promise.reject("NO_ACTIVITY", "No current activity");
    }
  }

  @ReactMethod
  void callJavaScript() {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      MainApplication application = (MainApplication) activity.getApplication();
      ReactNativeHost reactNativeHost = application.getReactNativeHost();
      ReactInstanceManager reactInstanceManager = reactNativeHost.getReactInstanceManager();
      ReactContext reactContext = reactInstanceManager.getCurrentReactContext();

      if (reactContext != null) {
        CatalystInstance catalystInstance = reactContext.getCatalystInstance();
        WritableNativeArray params = new WritableNativeArray();
        params.pushString("Hello, JavaScript!");

        // AFAIK, this approach to communicate from Java to JavaScript is officially undocumented.
        // Use at own risk; prefer events.
        // Note: Here we call 'alert', which shows UI. If this is done from an activity that
        // doesn't forward lifecycle events to React Native, it wouldn't work.
        catalystInstance.callFunction("JavaScriptVisibleToJava", "alert", params);
      }
    }
  }
}
