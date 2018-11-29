package com.volumemanager.modules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.location.LocationManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class LocationModule extends ReactContextBaseJavaModule {

  private ReactApplicationContext mContext;
  private LocationManager lm;

  private volatile BroadcastReceiver locationBR;

  //constructor
  public LocationModule(ReactApplicationContext reactContext) {
      super(reactContext);
      mContext = reactContext;
      lm = (LocationManager) mContext.getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
  }

  //Mandatory function getName that specifies the module name
  @Override
  public String getName() {
      return "Location";
  }

  private boolean isLocationAvailable() {
    return lm.isProviderEnabled(LocationManager.GPS_PROVIDER)
            || lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
  }

  private void listenLocationState() {
    if (locationBR == null) {
      synchronized (this) {
        if (locationBR == null) {
          locationBR = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
              if (intent.getAction().equals(LocationManager.PROVIDERS_CHANGED_ACTION)) {
                mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("EventLocationChange", isLocationAvailable());
              }
            }
          };
          IntentFilter locationFilter = new IntentFilter();
          locationFilter.addAction(LocationManager.PROVIDERS_CHANGED_ACTION);

          mContext.registerReceiver(locationBR, locationFilter);
        }
      }
    }
  }

  @ReactMethod
  public void isLocationEnabled(Promise promise) {
    if (lm != null) {
        promise.resolve(isLocationAvailable());
    } else {
        promise.reject("-1", "get location manager failed");
    }
  }

  @ReactMethod
  public void activeLocationListener(Promise promise) {
    listenLocationState();
    promise.resolve(null);
  }
}