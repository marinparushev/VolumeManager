package com.volumemanager.modules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import android.app.NotificationManager;
import android.content.Context;
import android.media.AudioManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class VolumeModule extends ReactContextBaseJavaModule {
  private static final String VOL_VOICE_CALL = "call";
  private static final String VOL_SYSTEM = "system";
  private static final String VOL_RING = "ring";
  private static final String VOL_MUSIC = "music";
  private static final String VOL_ALARM = "alarm";
  private static final String VOL_NOTIFICATION = "notification";

  private ReactApplicationContext mContext;
  private AudioManager am;

    //constructor
    public VolumeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        am = (AudioManager) mContext.getApplicationContext().getSystemService(Context.AUDIO_SERVICE);
    }
    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "Volume";
    }

    @ReactMethod
    public void setVolume(float val, ReadableMap config) {
      String type = config.getString("type");
      boolean playSound = config.getBoolean("playSound");
      boolean showUI = config.getBoolean("showUI");

      int volType = getVolType(type);
      int flags = 0;
      if (playSound) {
          flags |= AudioManager.FLAG_PLAY_SOUND;
      }
      if (showUI) {
          flags |= AudioManager.FLAG_SHOW_UI;
      }

      try {
        am.setStreamVolume(volType, (int) (val * am.getStreamMaxVolume(volType)), flags);
      } catch (SecurityException e) {
          // if (val == 0) {
          //     Log.w(TAG, "setVolume(0) failed. See https://github.com/c19354837/react-native-system-setting/issues/48");
          //     NotificationManager notificationManager =
          //             (NotificationManager) mContext.getSystemService(Context.NOTIFICATION_SERVICE);
          //     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
          //             && !notificationManager.isNotificationPolicyAccessGranted()) {
          //         Intent intent = new Intent(android.provider.Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
          //         mContext.startActivity(intent);
          //     }
          // }
          // Log.e(TAG, "err", e);
      }
    }

    @ReactMethod
    public void getVolume(String type, Promise promise) {
      promise.resolve(getNormalizationVolume(type));
    }

    private int getVolType(String type) {
      switch (type) {
          case VOL_VOICE_CALL:
              return AudioManager.STREAM_VOICE_CALL;
          case VOL_SYSTEM:
              return AudioManager.STREAM_SYSTEM;
          case VOL_RING:
              return AudioManager.STREAM_RING;
          case VOL_ALARM:
              return AudioManager.STREAM_ALARM;
          case VOL_NOTIFICATION:
              return AudioManager.STREAM_NOTIFICATION;
          default:
              return AudioManager.STREAM_MUSIC;
      }
    }

    private float getNormalizationVolume(String type) {
      int volType = getVolType(type);
      return am.getStreamVolume(volType) * 1.0f / am.getStreamMaxVolume(volType);
    }
}