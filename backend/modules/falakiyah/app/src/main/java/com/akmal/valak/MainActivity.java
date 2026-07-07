package com.akmal.valak;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Switch;
import com.itextpdf.kernel.colors.Color;

import static com.akmal.valak.SunMoon.*;
import static com.akmal.valak.fungsi.*;
import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.provider.Settings;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfAConformanceLevel;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.WriterProperties;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;
import android.widget.CompoundButton;

public class MainActivity extends AppCompatActivity {

    private static final int REQUEST_CODE_STORAGE_PERMISSION = 99;
    private static final int REQUEST_STORAGE_PERMISSION = 98;
    private static final int REQUEST_MANAGE_EXTERNAL_STORAGE = 97;
    private TextView hasil,hasil1,hasil2,no4,hasil4,hasil5,hasil6,hasil7,hasil8,hasil10;
    private TextView no1,no2,no3,j1,j2,j3,j4,j5,j9;
    private Button hitungButton;
    private Button btHapus,btPdf,btGps;
    private EditText etTahunH,etTambah,etHasib;
    private EditText etLokasi,Ltd,Ltm,Lts,Btd,Btm,Bts,Tz,Tt,Bt,Su,etLf;
    private LocationManager locationManager;
    private boolean locationManagerActivated = false;
    private String SHARED_PREFERENCES_NAME;
    private static final int CREATE_FILE_REQUEST_CODE = 123;
    private StringBuilder imsakB = new StringBuilder();
    private StringBuilder terbitB = new StringBuilder();
    private StringBuilder subuhB = new StringBuilder();
    private StringBuilder duhurB = new StringBuilder();
    private StringBuilder asarB = new StringBuilder();
    private StringBuilder magribB = new StringBuilder();
    private StringBuilder isaB = new StringBuilder();
    private StringBuilder Tmalam = new StringBuilder();
    private StringBuilder noB = new StringBuilder();
    private StringBuilder hariB = new StringBuilder();
    private StringBuilder tgllB = new StringBuilder();
    private StringBuilder malamB = new StringBuilder();
    private Uri uri;
    private String filePath;
    private Object ColorConstants;
    private String LokasiP,tahunP,LintangP,lajnahP,hasibP;
    private String wisP="WIB";
    private Switch switchButton;
    private Switch switchHM;
    private boolean switchStatus;
    private boolean hmStatus;
    private String imsakD;
    private String subuhD;
    private String duhurD;
    private String asarD;
    private String magribD;
    private String isyaD;
    private String terbitD;
    private String tengahD;
    private String malam23D;
    private String kesimpulan;
    private String kesimpulan1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        hasil = findViewById(R.id.hasil);
        hasil1 = findViewById(R.id.hasil1);
        hasil2 = findViewById(R.id.hasil2);
        no4 = findViewById(R.id.hasil3);
        hasil4 = findViewById(R.id.hasil4);
        hasil5 = findViewById(R.id.hasil5);
        hasil6 = findViewById(R.id.hasil6);
        hasil7 = findViewById(R.id.hasil7);
        hasil8 = findViewById(R.id.hasil8);
        hasil10 = findViewById(R.id.hasil10);
        no1=findViewById(R.id.no1);
        no2=findViewById(R.id.no2);
        no3=findViewById(R.id.no3);
        j1=findViewById(R.id.j1);
        j2=findViewById(R.id.j2);
        j3=findViewById(R.id.j3);
        j4=findViewById(R.id.j4);
        j5=findViewById(R.id.j5);
        j9=findViewById(R.id.j9);
        etTahunH=findViewById(R.id.etTahunH);
        etTambah=findViewById(R.id.etTambah);
        etHasib=findViewById(R.id.etHasib);
        etLf=findViewById (R.id.etLf);
        Ltd=findViewById(R.id.etLtd);
        Ltm=findViewById(R.id.etLtm);
        Lts=findViewById(R.id.etLts);
        Btd=findViewById(R.id.etBtd);
        Btm=findViewById(R.id.etBtm);
        Bts=findViewById(R.id.etBts);
        Tz=findViewById(R.id.etTz);
        Tt=findViewById(R.id.etTt);
        Bt=findViewById(R.id.etBT);
        Su=findViewById(R.id.etSU);
        etLokasi=findViewById(R.id.etLokasi);
        btHapus=findViewById(R.id.btHapus);
        btPdf=findViewById(R.id.btCopy);
        btGps=findViewById(R.id.btGps);
        hitungButton = findViewById(R.id.buttonHitung);
        switchButton = findViewById(R.id.switchButton);
        switchHM = findViewById(R.id.switchHM);
        // Initialize LocationManager
        locationManager = (LocationManager)
                getSystemService(Context.LOCATION_SERVICE);
        // Check for location permissions
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION) !=
                PackageManager.PERMISSION_GRANTED) {
            // Permissions are not granted, request them
            ActivityCompat.requestPermissions(this, new
                    String[]{Manifest.permission.ACCESS_FINE_LOCATION,
                    Manifest.permission.ACCESS_COARSE_LOCATION}, 1);
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R &&
                !Environment.isExternalStorageManager()) {
            Intent intent = new
                    Intent(Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION);
            startActivityForResult(intent, REQUEST_CODE_STORAGE_PERMISSION);
        } else {
            // Lanjutkan ke langkah berikutnya
        }
        if (ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE) !=
                PackageManager.PERMISSION_GRANTED) {
            // Jika izin belum diberikan, tanyakan izin
            ActivityCompat.requestPermissions(this, new
                            String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    REQUEST_STORAGE_PERMISSION);
        } else {
            // Lakukan operasi penyimpanan di sini
        }
        // Set click listener for the btGps button
        btGps.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Check if location permissions are granted
                if (ContextCompat.checkSelfPermission(MainActivity.this,
                        Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
                        && ContextCompat.checkSelfPermission(MainActivity.this,
                        Manifest.permission.ACCESS_COARSE_LOCATION) ==
                        PackageManager.PERMISSION_GRANTED) {
                    // Permissions are granted, request location updates
                    locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0, 0, locationListener);
                } else {
                    // Permissions are not granted, request them again (this should ideally be handled earlier in the app flow)
                    ActivityCompat.requestPermissions(MainActivity.this, new
                            String[]{Manifest.permission.ACCESS_FINE_LOCATION,
                            Manifest.permission.ACCESS_COARSE_LOCATION}, 1);
                }
            }
        });
        hitungButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                hitungDanTampilkanJadwal();
                hasil.setVisibility(View.VISIBLE);
                hasil1.setVisibility(View.VISIBLE);
                hasil2.setVisibility(View.VISIBLE);
                no4.setVisibility(View.VISIBLE);
                hasil4.setVisibility(View.VISIBLE);
                hasil5.setVisibility(View.VISIBLE);
                hasil6.setVisibility(View.VISIBLE);
                hasil7.setVisibility(View.VISIBLE);
                hasil8.setVisibility(View.VISIBLE);
                hasil10.setVisibility(View.VISIBLE);
                no1.setVisibility(View.VISIBLE);
                no2.setVisibility(View.VISIBLE);
                no3.setVisibility(View.VISIBLE);
                j1.setVisibility(View.VISIBLE);
                j2.setVisibility(View.VISIBLE);
                j3.setVisibility(View.VISIBLE);
                j4.setVisibility(View.VISIBLE);
                j5.setVisibility(View.VISIBLE);
                j9.setVisibility(View.VISIBLE);
            }
        });
        btHapus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                imsakB.setLength(0);
                subuhB.setLength(0);
                terbitB.setLength(0 );
                duhurB.setLength(0);
                asarB.setLength(0);
                magribB.setLength(0);
                isaB.setLength(0);
                Tmalam.setLength(0);
                noB.setLength(0);
                hariB.setLength(0);
                tgllB.setLength(0);
                malamB.setLength(0);
                hasil.setText(" ");
                hasil1.setText(" ");
                hasil2.setText(" ");
                no4.setText(" ");
                hasil4.setText(" ");
                hasil5.setText(" ");
                hasil6.setText(" ");
                hasil7.setText(" ");
                hasil8.setText(" ");
                hasil10.setText("");
                no1.setText(" ");
                no2.setText(" ");
                no3.setText(" ");
                hasil.setVisibility(View.GONE);
                hasil1.setVisibility(View.GONE);
                hasil2.setVisibility(View.GONE);
                no4.setVisibility(View.GONE);
                hasil4.setVisibility(View.GONE);
                hasil5.setVisibility(View.GONE);
                hasil6.setVisibility(View.GONE);
                hasil7.setVisibility(View.GONE);
                hasil8.setVisibility(View.GONE);
                hasil10.setVisibility(View.GONE);
                no1.setVisibility(View.GONE);
                no2.setVisibility(View.GONE);
                no3.setVisibility(View.GONE);
                j1.setVisibility(View.GONE);
                j2.setVisibility(View.GONE);
                j3.setVisibility(View.GONE);
                j4.setVisibility(View.GONE);
                j5.setVisibility(View.GONE);
                j9.setVisibility(View.GONE);
            }
        });
        btPdf.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String no = noB.toString ();
                String hari= hariB.toString ();
                String tgl= tgllB.toString ();
                String ImsakB = imsakB.toString ();
                String TerbitB= terbitB.toString ();
                String SubuhB= subuhB.toString ();
                String duhur = duhurB.toString ();
                String asar= asarB.toString ();
                String magrib= magribB.toString ();
                String isa = isaB.toString ();
                String tmalam= Tmalam.toString ();
                String no1= noB.toString ();
                String malamA=malamB.toString();
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    try {
                        createAndSavePdf("Imsakiyah.pdf",no,hari,tgl,ImsakB,SubuhB, TerbitB,duhur,asar,magrib,isa,tmalam,malamA,no1);
                    } catch (MalformedURLException e) {
                        throw new RuntimeException (e);
                    }
                }
            }
        });
// Menambahkan listener untuk switchButton
        switchButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean
                    isChecked) {
                switchStatus = isChecked;
                if (isChecked) {
                    wisP= "WIS"; // Jika switch diaktifkan
                } else {
                    wisP= "WIB"; // Jika switch dimatikan
                }
            }
        });
        switchHM.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean
                    isChecked) {
                hmStatus = isChecked;
            }
        });
    }

    private void hitungDanTampilkanJadwal() {

        //Baca data inputan
        double ThnH=Double.parseDouble(etTahunH.getText().toString());
        double TZ=Double.parseDouble(Tz.getText().toString());
        double TT=Double.parseDouble(Tt.getText().toString());
        double b1=Double.parseDouble(Ltd.getText().toString());
        double b2=Double.parseDouble(Ltm.getText().toString());
        double b3=Double.parseDouble(Lts.getText().toString());
        double l1=Double.parseDouble(Btd.getText().toString());
        double l2=Double.parseDouble(Btm.getText().toString());
        double l3=Double.parseDouble(Bts.getText().toString());
        String np=(Su.getText().toString());
        String bt=(Bt.getText().toString());
        double TB= Double.parseDouble(etTambah.getText().toString());
        String Lok=etLokasi.getText().toString();

        double Lt,Bt;
        Bt= l1+l2/60+l3/3600;
        if (np.equalsIgnoreCase("s")) {
            Lt = -1 * (b1 + b2 / 60 + b3 / 3600);
        } else {
            Lt = b1 + b2 / 60 + b3 / 3600;
        }

        String LtString = String.valueOf(Lt);
        String SU;
        if (np.equalsIgnoreCase("s")) {
            SU = "LS";
        } else {
            SU = "LU";
        }
        String BT;
        if (bt.equalsIgnoreCase("t")) {
            BT = "BT";
        } else {
            BT = "BB";
        }
        String Lintang= String.valueOf("LT: "+DMS(Lt)+" "+ SU +" | "+ "BT: "+DMS(Bt)+" "+BT+" | "+"TT: "+TT+" | "+"TZ: "+(int)TZ);

        LokasiP=etLokasi.getText ().toString ();
        tahunP=etTahunH.getText ().toString ();
        LintangP=Lintang;
        lajnahP=etLf.getText ().toString ();
        hasibP=etHasib.getText().toString();

        double [] awalBulanH8= awalBulanH(8,ThnH,TT,TZ,Bt,Lt,TB,np);
        double jdi8= awalBulanH8[3];
        double jd8 = awalBulanH8[0];
        String tinggiH8= String.valueOf(Dms(awalBulanH8[1]));
        String elong8= String.valueOf(Dms(awalBulanH8[2]));
        String harpas8= JdtoHarpas(jdi8,TZ);
        String tgli8=JDKM(jdi8,TZ,"tbt");
        String istikmal8;

        double [] awalBulanH9= awalBulanH(9,ThnH,TT,TZ,Bt,Lt,TB,np);
        double jdi9= awalBulanH9[3];
        double jd9 = awalBulanH9[0];
        String tinggiH9= String.valueOf(Dms(awalBulanH9[1]));
        String elong9= String.valueOf(Dms(awalBulanH9[2]));
        String harpas9= JdtoHarpas(jdi9,TZ);
        String tgli9=JDKM(jdi9,TZ,"tbt");
        String istikmal9;

        double [] awalBulanH10= awalBulanH(10,ThnH,TT,TZ,Bt,Lt,TB,np);
        double jd10 = awalBulanH10[0];
        double jdi10= awalBulanH10[3];
        String tinggiH10= String.valueOf(Dms(awalBulanH10[1]));
        String elong10= String.valueOf(Dms(awalBulanH10[2]));
        String harpas10= JdtoHarpas(jdi10,TZ);
        String tgli10=JDKM(jdi10,TZ,"tbt");
        String istikmal10;

        double usiaB = jd10- jd9;
        double akhir;
        double usiaA=jdi9-jdi8;

        if(usiaB<=29){akhir=usiaB;}else{akhir=30;}
        if(usiaA<=29){istikmal9="Rukyat";}else{istikmal9="Istikmal";}
        if(usiaB<=29){istikmal10="Rukyat";}else{istikmal10="Istikmal";}


        for (int i = 0; i < akhir; i++) {
            // Tentukan tanggal awal
            double jds= jd9;
            double jdi=jds +i;
            double tglM,blnM,thnM;
            tglM=JDKMM(jdi,TZ,"tgl");
            blnM=JDKMM(jdi,TZ,"bln");
            thnM=JDKMM(jdi,TZ,"thn");

            // Lakukan perhitungan waktu shalat untuk tanggal tertentu
            double[] sholatTM=sholat2(tglM,blnM,thnM,TZ, Lt,2,Bt,TT);
            double sholatImsak= sholatTM[1];
            double sholatSubuh=sholatTM[2];
            double sholatDuhur=sholatTM[3];
            double sholatAsr=sholatTM[6];
            double sholatMagrib=sholatTM[7];
            double sholatIsya=sholatTM[8];
            double sholatTerbit=sholatTM[5];
            double tengahM=sholatTM[11];
            double tengahM1=sholatTM[9];
            double tanggalB= JDKMM(jdi,7,"tgl");
            double bulanB= JDKMM(jdi,7,"bln");
            double tahunB= JDKMM(jdi,7,"thn");
            double wis=sholatTM[10];

            // Menambahkan nilai dari tombol pilihan (switchButton) jika diaktifkan
            if (switchStatus) {
                sholatImsak += wis;
                sholatSubuh += wis;
                sholatDuhur += wis;
                sholatAsr += wis;
                sholatMagrib += wis;
                sholatIsya += wis;
                sholatTerbit += wis;
                tengahM += wis;
                tengahM1 += wis;
            }

            if(hmStatus) {
                imsakD  = String.valueOf(Hmssholat1(sholatImsak));
                subuhD  = String.valueOf(Hmssholat1(sholatSubuh));
                duhurD  = String.valueOf(Hmssholat1(sholatDuhur));
                asarD   = String.valueOf(Hmssholat1(sholatAsr));
                magribD = String.valueOf(Hmssholat1(sholatMagrib));
                isyaD   = String.valueOf(Hmssholat1(sholatIsya));
                terbitD = String.valueOf(Hmssholat1(sholatTerbit));
                tengahD = String.valueOf(Hmssholat1(tengahM));
                malam23D= String.valueOf(Hmssholat1(tengahM1));
            }else {
                imsakD  = String.valueOf(Hms0(sholatImsak));
                subuhD  = String.valueOf(Hms0(sholatSubuh));
                duhurD  = String.valueOf(Hms0(sholatDuhur));
                asarD   = String.valueOf(Hms0(sholatAsr));
                magribD = String.valueOf(Hms0(sholatMagrib));
                isyaD   = String.valueOf(Hms0(sholatIsya));
                terbitD = String.valueOf(Hms0(sholatTerbit));
                tengahD = String.valueOf(Hms0(tengahM));
                malam23D= String.valueOf(Hms0(tengahM1));
            }

            String tanggalC= String.valueOf((int)tanggalB+"/"+(int)bulanB+"/"+(int)tahunB);
            String har2= JdtoHari(jdi,7);
            String hari5= String.valueOf(har2);

            // Tambahkan hasil perhitungan ke StringBuilder
            imsakB.append( imsakD+ "\n");
            subuhB.append( subuhD+ "\n");
            terbitB.append( terbitD+ "\n");
            duhurB.append( duhurD+ "\n");
            asarB.append( asarD+ "\n");
            magribB.append( magribD+ "\n");
            isaB.append( isyaD+ "\n");
            Tmalam.append( tengahD+ "\n");
            noB.append(i+1+ "\n");
            hariB.append(hari5+ "\n");
            tgllB.append(tanggalC+ "\n");
            malamB.append(malam23D+"\n");

        }
        // Set hasil perhitungan pada TextView
        hasil.setText(imsakB.toString());
        hasil1.setText(subuhB.toString());
        hasil2.setText(duhurB.toString());
        no4.setText(terbitB.toString());
        hasil4.setText(asarB.toString());
        hasil5.setText(magribB.toString());
        hasil6.setText(isaB.toString());
        hasil7.setText(Tmalam.toString());
        hasil8.setText(noB.toString());
        hasil10.setText(malamB.toString());
        no1.setText(noB.toString());
        no2.setText(hariB.toString());
        no3.setText(tgllB.toString());
        j2.setText(String.valueOf((int)ThnH)+" H");
        j4.setText(Lok);
        j5.setText(Lintang);
        j9.setText("( "+wisP+" )");


        kesimpulan ="Ijtima akhir bulan Sya'ban tahun "+(int)ThnH+" H"+'\n'+
                "terjadi pada hari "+harpas9+", "+tgli9+'\n'+
                "tinggi hilal mar'i saat ijtima': "+tinggiH9+", dan elongasi geosentris: "+elong9
        ;
        kesimpulan1 ="Ijtima akhir bulan Ramadhan tahun "+(int)ThnH+" H"+'\n'+
                "terjadi pada hari "+harpas10+", "+tgli10+'\n'+
                "tinggi hilal mar'i saat ijtima': "+tinggiH10+", dan elongasi geosentris: "+elong10
        ;

    }
    // LocationListener untuk menerima pembaruan lokasi
    private final LocationListener locationListener = new LocationListener() {

        private String SHARED_PREFERENCES_NAME;
        @Override
        public void onLocationChanged(Location location)
        {
            // Lokasi pengguna berubah
            double latitude = location.getLatitude();
            double longitude = location.getLongitude();
            double altitude = location.getAltitude();
            getAddress(latitude, longitude);
            getTimeZone(latitude, longitude);

            double lintang=Math.abs(latitude);
            double bujur= Math.abs(longitude);

            int ltdd = (int) lintang;
            double minutesFloat = (lintang - ltdd) * 60;
            int ltdm = (int) minutesFloat;
            double ltds = (minutesFloat - ltdm) * 60;
            int btdd = (int) bujur;
            double minutesFloat1 = (bujur - btdd) * 60;
            int btdm = (int) minutesFloat1;
            double btds = (minutesFloat1 - btdm) * 60;

            // Panggil fungsi getTimeZoneOffset untuk mendapatkan offset zona waktu berdasarkan koordinat
            int timeZoneOffset = getTimeZoneOffset(latitude, longitude);
            Tz.setText(String.valueOf(timeZoneOffset));
            Btd.setText(String.valueOf(btdd));
            Btm.setText(String.valueOf(btdm));
            Bts.setText(String.valueOf(round((btds),2)));
            Ltd.setText(String.valueOf(ltdd));
            Ltm.setText(String.valueOf(ltdm));
            Lts.setText(String.valueOf(round((ltds),2)));
            Tt.setText(String.valueOf(round((altitude),2)));
            SharedPreferences sharedPreferences = MainActivity.this.getSharedPreferences(SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = sharedPreferences.edit();

            editor.putString("ltd", Double.toString(ltdd));
            editor.putString("ltm", Double.toString(ltdm));
            editor.putString("lts", Double.toString(ltds));
            editor.putString("btd", Double.toString(btdd));
            editor.putString("btm", Double.toString(btdm));
            editor.putString("bts", Double.toString(btds));
            editor.putString("tz", Double.toString(timeZoneOffset));
            editor.putString("tt", Double.toString(altitude));
            editor.apply();

            Toast.makeText(MainActivity.this, "Kordinat berhasil diperbaharui", Toast.LENGTH_SHORT).show();
        }
        @Override
        public void onStatusChanged(String provider, int status, Bundle extras)
        {
        }
        public void onProviderEnabled(String provider)
        {
        }
        public void onProviderDisabled(String provider)
        {
        }
    };
    private void getAddress(double latitude, double longitude)
    {
        Geocoder geocoder = new Geocoder(this, Locale.getDefault());
        try
        {
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            if (addresses != null && addresses.size() > 0)
            {
                Address address = addresses.get(0);
                String addressLine = address.getAddressLine(0); // Alamat lengkap
                String city = address.getLocality(); // Kota
                String state = address.getAdminArea(); // Provinsi / Negara Bagian
                String country = address.getCountryName(); // Negara
                String postalCode = address.getPostalCode(); // Kode Pos
                etLokasi.setText(city);
                SharedPreferences sharedPreferences = MainActivity.this.getSharedPreferences(SHARED_PREFERENCES_NAME, Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedPreferences.edit();

                editor.putString("lokasi", city);

                editor.apply();

                // Lakukan sesuatu dengan informasi alamat yang didapatkan (contoh: tampilkan dalam Toast)
                //String message = "Address: " + addressLine + "\nCity: " + city + "\nState: " + state + "\nCountry: " + country + "\nPostal Code: " + postalCode;
                Toast.makeText(this, "Lokasi berhasil diperbaharui", Toast.LENGTH_LONG).show();
            }
            else
            {
                Toast.makeText(this, "Alamat tidak ditemukan.", Toast.LENGTH_SHORT).show();
            }
        }
        catch (IOException e)
        {
            e.printStackTrace();
            Toast.makeText(this, "Terjadi kesalahan: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }
    private void getTimeZone(double latitude, double longitude)
    {
        TimeZone timeZone = TimeZone.getTimeZone(TimeZone.getDefault().getID());
    }
    private int getTimeZoneOffset(double latitude, double longitude)
    {
        TimeZone timeZone = TimeZone.getTimeZone(TimeZone.getDefault().getID());
        int offset = timeZone.getOffset(System.currentTimeMillis()) / (1000 * 60 * 60); // Dalam jam
        return offset;
    }

    public static double round(double value, int decimalPlaces)
    {
        double factor = Math.pow(10, decimalPlaces);
        return Math.round(value * factor) / factor;
    }
    public static String DMS(double decimal) {
        int degrees = (int) decimal;
        double minutesFloat = (decimal - degrees) * 60;
        int minutes = (int) minutesFloat;
        double seconds = (minutesFloat - minutes) * 60;

        return degrees + "° " + minutes + "' " + String.format("%.1f", seconds) + "\"";
    }

    public static String DMS1(double decimal) {
        double absDecimal = Math.abs(decimal); // Mengubah nilai negatif menjadi positif
        int degrees = (int) absDecimal;
        double minutesFloat = (absDecimal - degrees) * 60;
        int minutes = (int) minutesFloat;
        double seconds = (minutesFloat - minutes) * 60;

        String hemisphere = (decimal < 0) ? "S" : "N"; // Menentukan hemisfer, "S" untuk selatan, "N" untuk utara

        return degrees + "° " + minutes + "' " + String.format("%.1f", seconds) + "\" " + hemisphere;
    }
    @NonNull
    public static String DMSb(double decimal) {
        double absDecimal = Math.abs(decimal); // Mengubah nilai negatif menjadi positif
        int degrees = (int) absDecimal;
        double minutesFloat = (absDecimal - degrees) * 60;
        int minutes = (int) minutesFloat;
        double seconds = (minutesFloat - minutes) * 60;

        String hemisphere = (decimal < 0) ? "B" : "T"; // Menentukan hemisfer, "S" untuk selatan, "N" untuk utara

        return degrees + "° " + minutes + "' " + String.format("%.1f", seconds) + "\" " + hemisphere;
    }

    @Override
    public void onBackPressed() {
        // Menutup aplikasi saat tombol "Back" perangkat ditekan
        super.onBackPressed();
        finish();
    }
    // Handle permission request results if needed

    // Don't forget to stop location updates when they are no longer needed (e.g., in onDestroy)
    @Override
    protected void onDestroy() {
        super.onDestroy();
        locationManager.removeUpdates(locationListener);
    }

    public double[] awalBulanH(int blnH, double ThnH , double Tmp, double tz, double Bt, double Lt, double tbh, @NonNull String np ) {

        int BlnH=blnH;
        double TZ =tz;
        double TT = Tmp;
        double TB = tbh;
        String[] nmhijri = new String[13];
        nmhijri[0] = "Dzulhijjah";
        nmhijri[1] = "Muharam";
        nmhijri[2] = "Shafar";
        nmhijri[3] = "R.Awal";
        nmhijri[4] = "R.Tsani";
        nmhijri[5] = "J.Ula";
        nmhijri[6] = "J.Tsani";
        nmhijri[7] = "Rajab";
        nmhijri[8] = "Sya'ban";
        nmhijri[9] = "Ramadlan";
        nmhijri[10] = "Syawal";
        nmhijri[11] = "Dzulqa'dah";
        nmhijri[12] = "Dzulhijjah";

        double lt=Lt;
        double bt=Bt;
        if(np.equals("S")){lt=-lt;}else {lt=lt;}
        double k =BlnH +12 *ThnH - 17050;
        double Z =Phases(k,0);
        int tgl =(int)JDKMM(Z,TZ,"tgl");
        int bln =(int)JDKMM(Z,TZ,"bln");
        int thn =(int)JDKMM(Z,TZ,"thn");
        double Jamdes = JDKMM(Z,TZ,"jam");
        double JD =KMJDf(tgl,bln,thn,11,TZ);
        JD=JD+DeltaT(JD)/86400;
        String[] Hari = new String[8];
        Hari[0] = "Sabtu";
        Hari[1] = "Ahad";
        Hari[2] = "Senin";
        Hari[3] = "Selasa";
        Hari[4] = "Rabu";
        Hari[5] = "Kamis";
        Hari[6] = "Jum'at";
        Hari[7] = "Sabtu";
        String[] Pasaran = new String[6];
        Pasaran[0] = "Wage ";
        Pasaran[1] = "Kliwon ";
        Pasaran[2] = "Legi ";
        Pasaran[3] = "Pahing ";
        Pasaran[4] = "Pon ";
        Pasaran[5] = "Wage ";

        int thnH;
        if(BlnH==1){ thnH=(int)ThnH-1;}else{thnH=(int)ThnH;}
        String bulnhijri =nmhijri[(int)BlnH-1]+" "+ thnH + " H";
        int thawl=0 ;
        if(BlnH==1){ thawl=(int)ThnH;}else{thawl=(int)ThnH;}
        String bulnhijri1 =nmhijri[(int)BlnH]+" "+ thawl + " H";

        String[] NmBlnMDt = new String[13];
        NmBlnMDt [0]= "Desember";
        NmBlnMDt [1]="Januari";
        NmBlnMDt [2]="Februari";
        NmBlnMDt [3]="Maret";
        NmBlnMDt [4]="April";
        NmBlnMDt [5]="Mei";
        NmBlnMDt [6]="Juni";
        NmBlnMDt [7]="Juli";
        NmBlnMDt [8]= "Agustus";
        NmBlnMDt [9]="September";
        NmBlnMDt [10]="Oktober";
        NmBlnMDt [11]="November";
        NmBlnMDt [12]="Desember";
        String Tglbln=tgl+" "+NmBlnMDt [bln - 0]+" "+thn+" M";

        int hari=(int)((Z+1.5+TZ/24)%7+1);
        int pasr=(int)((Z+1.5+TZ/24)%5+1);
        String NmHr=Hari[hari];
        String NmPs=Pasaran[pasr];
        String HARI = NmHr+" "+NmPs;

        double DataBln,NamaBln;
        double th,tm,DECm,reff,ILM,SDm,ref;
        double arm,arb,decm,decb,par,sdm,sdb;
        double jd,swb,Ir,JDI,kr,eqt,dh;
        double Swm,gh,JI,el,bd;
        double lh,azm,azb,nh,mr,ghb;

        DECm=SunApparentDeclination(JD);
        eqt=EquationOfTime(JD);
        SDm=SunAngularSemiDiameter(JD);
        Ir=0-SDm-(34.5/60)-1.76/60*Math.sqrt(TT);
        dh=12-eqt+((TZ*15)-bt)/15;

        Swm=Deg(Acs (Sin(Rad(Ir))/Cos(Rad(lt))/Cos(Rad(DECm))-Tan(Rad(lt))*Tan(Rad(DECm))));
        gh=dh+Swm/15;
        JI=ModFDiv(gh-TZ,24);
        kr=JI-Math.floor(JI);
        jd=KMJDf(tgl,bln,thn,gh,TZ);
        decm=SunApparentDeclination( jd);
        decb=DECB(jd);
        arm=SunApparentRightAscension (jd);
        arb=ARB(jd);
        par=MoonParallax(jd);
        sdb=SDB(jd);
        swb=arm-arb+Swm;
        th=Deg(Asn(Sin(Rad(lt))*Sin(Rad(decb))+Cos(Rad(lt))*Cos(Rad(decb))*Cos(Rad(swb))));
        reff=Cos(Rad(th))*par;
        ref=0.0167/Tan(Rad(th+7.31/(th+4.4)));
        tm=th+ref+(1.76*Math.sqrt(TT)/60)-reff;
        double tc=th+ref+(1.76*Math.sqrt(TT)/60);
        double tu=th+ref+(1.76*Math.sqrt(TT)/60)+reff;
        lh=tm/15;
        azm=Deg(Atn (-Sin(Rad(lt))/Tan(Rad(Swm))+Cos(Rad(lt))*Tan(Rad(decm))/Sin(Rad(Swm))));
        azb=Deg(Atn (-Sin(Rad(lt))/Tan(Rad(swb))+Cos(Rad(lt))*Tan(Rad(decb))/Sin(Rad(swb))));
        nh=Math.sqrt(Math.abs(Math.pow((azb-azm),2))+Math.pow(tm,2))/15;
        mr=Deg(Atn((azb-azm)/tm));
        ghb=gh+lh;
        bd=azb-azm;
        double kmh,tt,um,uh,ul;
        double umh;
        String azB,kh;
        if (azb<azm) { azB =" Selatan Matahri";}
        else {azB="Utara Matahari" ;}
        kmh=MoonBrightLimbAngle( jd );
        nh=MoonDiskIlluminatedFraction(jd);
        if (kmh<=15 ) {kh=" Terlentang" ;}
        if (bd<0) { kh=" Miring Selatan";} else
        {kh= " Miring Utara";}
        el=Deg(Acs(Sin(Rad(decm)) * Sin(Rad(decb)) + Cos(Rad(decm)) * Cos(Rad(decb)) * Cos(Rad(arm - arb))));

        double jdijtimak =Phases(12*ThnH+BlnH-17050,0);
        double tGl = JDKMM(jdijtimak,TZ,"tgl");
        double bLn = JDKMM(jdijtimak,TZ,"bln");
        double tHn = JDKMM(jdijtimak,TZ,"thn");
        double jam = JDKMM(jdijtimak,TZ,"jam");

        double Jd = TB+KMJDf(tgl,bln,thn,10,0);
        double delta = DeltaT(Jd);
        double jde = Jd+delta/86400d;
        double dec = SunApparentDeclination(jde);
        double sdM = SunAngularSemiDiameter(jde);
        double eqT = EquationOfTime(jde);
        double pi = Math.PI;
        double irm = 0-sdM-(float)34.5/60-(float)1.76/60*Math.sqrt(TT);

        double swm =ACOS(SIN(irm)/COS(lt)/COS(dec)-TAN(lt)*TAN(dec));
        double ghurub = 12-eqT+(TZ*15-bt+swm)/15;
        jd = TB+KMJDf(tgl,bln,thn,ghurub,TZ);
        delta = DeltaT(jd);
        jde = jd+delta/86400d;
        double arM = SunApparentRightAscension(jde);
        double arB = ARB(jde);
        double db = DECB(jde);
        double sdB = SDB(jde);
        double hp = MoonParallax(jde);
        double swB = arM-arB+swm;
        double elong =ACOS(SIN(dec)*SIN(db)+COS(dec)*COS(db)*COS((arB-arM)));
        double hakiki = ASIN(SIN(lt)*SIN(db)+COS(lt)*COS(db)*COS(swB));
        double Par  = hp * COS(hakiki);
        double dip = (float)1.76/60*Math.sqrt(TT);
        double Ref = 0.0167/TAN(hakiki+7.31/(hakiki+4.4));
        double center =hakiki-Par+dip+Ref;
        double low   =  center-sdB;
        double up = center+sdB;
        double umur = ghurub - jam;
        double lama = hakiki/15;
        double Azm = ATAN(COS(lt)*TAN(dec)/SIN(swm)-SIN(lt)/TAN(swm))+270;
        double Azb = ATAN(COS(lt)*TAN(db)/SIN(swb)-SIN(lt)/TAN(swB))+270;
        double selisih = Azb-Azm;
        if (selisih<1 ) {kh=" Terlentang" ;}
        if (selisih<-1) { kh=" Miring Selatan";} else
        {kh= " Miring Utara";}
        double nurul = Math.sqrt(center*center+selisih*selisih)/15;
        String umur1="",hasil3;
        if(TB>0){umur1=" "+(int)TB+" Hari "+Hms(ModFDiv( (TB/24)+umur,24));}else{umur1=Hms(umur);}
        double dj;
        if (elong >= 6.4 && low >= 3) {
            dj = jdijtimak + 1d;
        } else {
            dj = jdijtimak + 2d;
        }

        if (TB > 0) {
            dj = jdijtimak + 2d;
        }

        double[] awalBulan= new double [4];
        awalBulan[0]=dj;
        awalBulan[1]=low;
        awalBulan[2]=elong;
        awalBulan[3]=jdijtimak;

        return awalBulan;
    }

    private double MoonParallax(double jd) {
        return jd;
    }

    private double DECB(double jde) {
        return jde;
    }

    private static final int CREATE_PDF_REQUEST_CODE = 42;
    @RequiresApi(api = Build.VERSION_CODES.R)
    private void createAndSavePdf(
            String fileName,
            String no,
            String hari,
            String tgl,
            String imsakB,
            String subuhB,
            String terbitB,
            String duhur,
            String asar,
            String magrib,
            String isa,
            String tmalam,
            String malamB,
            String no1) throws MalformedURLException {
        // Membuat path file PDF
        filePath = getFilesDir() + File.separator + fileName + ".pdf";
        PdfWriter writer = null;
        try {
            // Mengatur ukuran kertas A4 dan orientasi landscape
            writer = new PdfWriter(filePath, new
                    WriterProperties().setFullCompressionMode(true));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            Toast.makeText(this, "Error creating PDF",
                    Toast.LENGTH_SHORT).show();
            return;
        }
        // Membuat PdfDocument
        PdfDocument pdf = new PdfDocument(writer);
        // Mengatur ukuran kertas A4 dan orientasi landscape pada dokumen
        PageSize pageSize = PageSize.A3;
        pdf.setDefaultPageSize(pageSize);
        // Membuat Document
        Document document = new Document(pdf);
        // Mengubah Drawable menjadi Bitmap
        Drawable drawable = getResources().getDrawable(R.drawable.logo);
// Ganti dengan nama file logo Anda
        BitmapDrawable bitmapDrawable = (BitmapDrawable) drawable;
        Bitmap bitmap = bitmapDrawable.getBitmap();
        // Menambahkan logo
        Image logo = new
                Image(ImageDataFactory.create(convertBitmapToByteArray(bitmap)));
        logo.setWidth(165); // Sesuaikan ukuran logo
        logo.setHeight(100);
        logo.setHorizontalAlignment(HorizontalAlignment.CENTER);
        document.add(logo);
        DeviceRgb rgbColor = new DeviceRgb(0, 100, 100); // Format: RGB
        // Menambahkan judul tiga baris
        Paragraph title1 = new Paragraph("JADWAL IMSAKIYAH RAMADHAN " +tahunP + " H");
        Paragraph title11 = new Paragraph("LEMBAGA FALAKIYAH "+ lajnahP);
        Paragraph title2 = new Paragraph("Wilayah " + LokasiP + " ( "+
                wisP +" )");
        Paragraph title3 = new Paragraph(LintangP);

        title1.setFontSize(16f).setBold().setTextAlignment(com.itextpdf.layout.properties.TextAlignment.CENTER).setFontColor(rgbColor).setMarginBottom(1);

        title11.setFontSize(16f).setBold().setTextAlignment(com.itextpdf.layout.properties.TextAlignment.CENTER).setFontColor(rgbColor).setMarginBottom(1);

        title2.setFontSize(14f).setBold().setTextAlignment(com.itextpdf.layout.properties.TextAlignment.CENTER).setMarginBottom(1);

        title3.setFontSize(14f).setBold().setTextAlignment(com.itextpdf.layout.properties.TextAlignment.CENTER).setMarginBottom(1);
        document.add(title1);
        document.add(title11);
        document.add(title2);
        document.add(title3);
        // Menambahkan watermark
        Image watermarkImage = new
                Image(ImageDataFactory.create(convertBitmapToByteArray(bitmap))); // Gantidengan path gambar watermark Anda
        watermarkImage.setOpacity(0.2f); // Sesuaikan tingkat transparansisesuai kebutuhan
// Menyesuaikan skala gambar agar sesuai dengan halaman
        float maxWidth = pdf.getDefaultPageSize().getWidth() * 0.8f; //Sesuaikan dengan persentase maksimum lebar halaman yang diizinkan
        float maxHeight = pdf.getDefaultPageSize().getHeight() * 0.8f; //Sesuaikan dengan persentase maksimum tinggi halaman yang diizinkan
        watermarkImage.scaleToFit(maxWidth, maxHeight);
// Mendapatkan ukuran halaman
        float pageWidth = pdf.getDefaultPageSize().getWidth();
        float pageHeight = pdf.getDefaultPageSize().getHeight();
// Mendapatkan ukuran gambar setelah disesuaikan
        float imageWidth = watermarkImage.getImageScaledWidth();
        float imageHeight = watermarkImage.getImageScaledHeight();
// Menempatkan watermark di tengah halaman
        float x = (pageWidth - imageWidth) / 2;
        float y = (pageHeight - imageHeight) / 2;
        document.add(watermarkImage.setFixedPosition(x, y));
        // Membuat Table dengan 12 kolom
        Table table = new Table(13);
        // Menambahkan sel header ke tabel
        table.addCell(new Cell().add(new Paragraph("No.")).setBold());
        table.addCell(new Cell().add(new Paragraph("Hari")).setBold());
        table.addCell(new Cell().add(new Paragraph("Tanggal")).setBold());
        table.addCell(new Cell().add(new Paragraph("Imsak")).setBold());
        table.addCell(new Cell().add(new Paragraph("Shubuh")).setBold());
        table.addCell(new Cell().add(new Paragraph("Terbit")).setBold());
        table.addCell(new Cell().add(new Paragraph("Dhuhur")).setBold());
        table.addCell(new Cell().add(new Paragraph("Ashar")).setBold());
        table.addCell(new Cell().add(new Paragraph("Maghrib")).setBold());
        table.addCell(new Cell().add(new Paragraph("Isya")).setBold());
        table.addCell(new Cell().add(new Paragraph("1/2 Malam")).setBold());
        table.addCell(new Cell().add(new Paragraph("2/3 Malam")).setBold());
        table.addCell(new Cell().add(new Paragraph("No.")).setBold());
        // Contoh warna RGB (merah)
        Color hijau = new DeviceRgb(0, 100, 100);
        Color putih = new DeviceRgb(255, 255, 255);
        Color merah = new DeviceRgb(255, 0, 0);
        Color orange = new DeviceRgb(255, 165, 0);
// Mewarnai sel header
        table.getCell(0, 0).setBackgroundColor(hijau);
        table.getCell(0, 1).setBackgroundColor(hijau);
        table.getCell(0, 2).setBackgroundColor(hijau);
        table.getCell(0, 3).setBackgroundColor(hijau);
        table.getCell(0, 4).setBackgroundColor(hijau);
        table.getCell(0, 5).setBackgroundColor(hijau);
        table.getCell(0, 6).setBackgroundColor(hijau);
        table.getCell(0, 7).setBackgroundColor(hijau);
        table.getCell(0, 8).setBackgroundColor(hijau);
        table.getCell(0, 9).setBackgroundColor(hijau);
        table.getCell(0, 10).setBackgroundColor(hijau);
        table.getCell(0, 11).setBackgroundColor(hijau);
        table.getCell(0, 12).setBackgroundColor(hijau);
        //mewarnai text
        table.getCell(0, 0).setFontColor(putih);
        table.getCell(0, 1).setFontColor(putih);
        table.getCell(0, 2).setFontColor(putih);
        table.getCell(0, 3).setFontColor(putih);
        table.getCell(0, 4).setFontColor(putih);
        table.getCell(0, 5).setFontColor(putih);
        table.getCell(0, 6).setFontColor(putih);
        table.getCell(0, 7).setFontColor(putih);
        table.getCell(0, 8).setFontColor(putih);
        table.getCell(0, 9).setFontColor(putih);
        table.getCell(0, 10).setFontColor(putih);
        table.getCell(0, 11).setFontColor(putih);
        table.getCell(0, 12).setFontColor(putih);
        //mengatur posisi text
        table.getCell(0, 0).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 1).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 2).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 3).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 4).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 5).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 6).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 7).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 8).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 9).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 10).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 11).setTextAlignment(TextAlignment.CENTER);
        table.getCell(0, 12).setTextAlignment(TextAlignment.CENTER);
        // Menambahkan sel data ke tabel
        table.addCell(new Cell().add(new Paragraph(no)));
        table.addCell(new Cell().add(new Paragraph(hari)));
        table.addCell(new Cell().add(new Paragraph(tgl)));
        table.addCell(new Cell().add(new Paragraph(imsakB)));
        table.addCell(new Cell().add(new Paragraph(subuhB)));
        table.addCell(new Cell().add(new Paragraph(duhur)));
        table.addCell(new Cell().add(new Paragraph(terbitB)));
        table.addCell(new Cell().add(new Paragraph(asar)));
        table.addCell(new Cell().add(new Paragraph(magrib)));
        table.addCell(new Cell().add(new Paragraph(isa)));
        table.addCell(new Cell().add(new Paragraph(tmalam)));
        table.addCell(new Cell().add(new Paragraph(malamB)));
        table.addCell(new Cell().add(new Paragraph(no1)));
        table.getCell(1, 3).setBackgroundColor(orange);
        table.getCell(1, 8).setBackgroundColor(hijau);
        table.getCell(1, 3).setFontColor(putih);
        table.getCell(1, 8).setFontColor(putih);
        table.getCell(1, 0).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 12).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 3).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 4).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 5).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 7).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 8).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 9).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 10).setTextAlignment(TextAlignment.CENTER);
        table.getCell(1, 11).setTextAlignment(TextAlignment.CENTER);
        table.setHorizontalAlignment(HorizontalAlignment.CENTER);
        // Menambahkan tabel ke dokumen
        document.add(table);
        Paragraph hasib = new Paragraph("Data Hilal Ramadhan "+tahunP+"H");

        hasib.setFontSize(14f).setBold().setTextAlignment(TextAlignment.LEFT);
        hasib.setMarginLeft(50).setMarginBottom(0);
        document.add (hasib);
        Paragraph kes = new Paragraph(kesimpulan);
        kes.setFontSize(12f).setTextAlignment(TextAlignment.LEFT);
        kes.setMarginLeft(50).setMarginBottom(0).setMarginRight(50);
        document.add (kes);
        Paragraph hasib1 = new Paragraph("Data Hilal Syawwal " + tahunP+"H");

        hasib1.setFontSize(14f).setBold().setTextAlignment(TextAlignment.LEFT);
        hasib1.setMarginLeft(50).setMarginBottom(0);
        document.add (hasib1);
        Paragraph kes1 = new Paragraph(kesimpulan1);
        kes1.setFontSize(12f).setTextAlignment(TextAlignment.LEFT);
        kes1.setMarginLeft(50).setMarginBottom(0).setMarginRight(50);
        document.add (kes1);
//
        Paragraph catat= new Paragraph("Catatan:");

        catat.setFontSize(14f).setBold().setTextAlignment(TextAlignment.LEFT);
        catat.setMarginLeft(50);
        document.add (catat);
        String notes="Penetapan Awal Ramadhan dan Hari Raya Idul Fitri menunggu Ikhbar PBNU dan Itsbat Pemerintah"+"\n"+ "Hisab waktu sholat menggunakan algoritma kitab Tsimarul Murid dan Hisab Awal Bulan Hijriah menggunakan metode Ephimeris algoritma Jean Meuus";
        Paragraph catat1= new Paragraph(notes);
        catat1.setFontSize(12f).setTextAlignment(TextAlignment.LEFT);
        catat1.setMarginLeft(50).setMarginRight(50);
        document.add (catat1);
        Paragraph catat3= new Paragraph("Al Hasib: "+ hasibP);

        catat3.setFontSize(10f).setTextAlignment(TextAlignment.LEFT).setItalic();
        catat3.setMarginLeft(50);
        document.add (catat3);
        // Menutup dokumen PDF
        pdf.close();
        // Memulai aktivitas untuk membuat file PDF
        createPdfFile(fileName, filePath);
    }
    private byte[] convertBitmapToByteArray(Bitmap bitmap) {
        ByteArrayOutputStream stream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, stream);
        return stream.toByteArray();
    }
    @RequiresApi(api = Build.VERSION_CODES.R)
    private void createPdfFile(String fileName, String filePath) {
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/pdf");
        intent.putExtra(Intent.EXTRA_TITLE, fileName);
        startActivityForResult(intent, CREATE_PDF_REQUEST_CODE);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode,
                                    Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == CREATE_PDF_REQUEST_CODE && resultCode ==
                RESULT_OK) {
            Uri uri = data.getData();
            if (uri != null) {
                try {
                    // Copy the generated PDF to the selected location
                    try (InputStream in = new FileInputStream(filePath);
                         OutputStream out =
                                 getContentResolver().openOutputStream(uri)) {
                        byte[] buf = new byte[1024];
                        int len;
                        while ((len = in.read(buf)) > 0) {
                            out.write(buf, 0, len);
                        }
                    }
                    Toast.makeText(this, "PDF created successfully!",
                            Toast.LENGTH_SHORT).show();
                } catch (IOException e) {
                    e.printStackTrace();
                    Toast.makeText(this, "Error creating PDF",
                            Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
}