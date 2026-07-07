package com.akmal.valak;

import static com.akmal.valak.SunMoon.EquationOfTime;
import static com.akmal.valak.SunMoon.SunAngularSemiDiameter;
import static com.akmal.valak.SunMoon.SunApparentDeclination;

import java.text.DecimalFormat;
import java.util.Locale;
public class fungsi
{
    public static double[] sholat1(double Tgl,double Bln,double Thn,double tz,double Lt,float  ihT,
                                   double Bt,double tt){

        double jd = KMJDf(Tgl,Bln,Thn,12,tz);
        double jde = jd ;//+ DeltaT(jd)/86400;
        double d = SunApparentDeclination(jde);
        double sd = SunAngularSemiDiameter(jde);
        double et = EquationOfTime(jde);

        double z,G;
        double hm,F,Imsak,Shubuh,Terbit,Dluha,Dhuhur,Ashar,Maghrib,Isya;
        z=12-et+((tz*15)-Bt)/15;

        F=-fungsi.TanA(Lt)*fungsi.TanA(d);
        G=fungsi.CosA(Lt)*fungsi.CosA(d);
        hm=0-sd-(float)34.5/60-(float)1.76/60*Math.sqrt(tt);
        double hA = Math.toDegrees(Math.atan(1/(Math.tan(Math.toRadians(ABS(Lt-d)))+1)));
        Imsak=z-Deg(Math.acos(F+SinA(-20)/G))/15-(float)10/60+ihT;

        Shubuh=z-Deg(Math.acos(F+SinA(-20)/G))/15+ihT;
        Terbit=z-Deg(Math.acos(F+SinA(hm)/G))/15-ihT;
        Dluha=z-Deg(Math.acos(F+SinA(4.5)/G))/15+ihT;
        Dhuhur=z+(float)3/60;
        Ashar=z+Deg(Math.acos(F+SinA(hA)/G))/15+ihT;
        Maghrib=z+Deg(Math.acos(F+SinA(hm)/G))/15+ihT;
        Isya=z+Deg(Math.acos(F+SinA(-18)/G))/15+ihT;
        double LamaMalam=ModFDiv(Shubuh-Maghrib,24);
        double Smalam=ModFDiv(Maghrib+(LamaMalam/2),24);
        double Tmalam=ModFDiv(Maghrib+((LamaMalam/3)*2),24);

        double tfwt = et+(Bt-tz*15)/15;
        return new double[]{0,Imsak,Shubuh,Terbit,Dluha,Dhuhur,Ashar,Maghrib,Isya,Smalam,Tmalam,tfwt};

    }

    public static double[] sholat2(double Tgl,double Bln,double Thn,double tz,double Lt,float  ihT,
                                   double Bt,double Tt){
        double Jdb = KMJDf(Tgl,Bln,Thn,12,tz);
        double d=SunApparentDeclination(Jdb);
        double sd=SunAngularSemiDiameter( Jdb);
        double et=EquationOfTime(Jdb);
        double z,F,G,hm,hz,hu,Imsak,Shubuh,Terbit,Dluha,Dhuhur,Ashar,Maghrib,Isya;
        double lt,bt,tt;
        lt=Lt;
        bt=Bt;
        tt=Tt;
        z=12-et+((tz*15)-bt)/15;
        F=-TanA(lt)*TanA(d);
        G=CosA(lt)*CosA(d);
        hz=-20;
        hu=-18;
        hm=0-sd-(float)34.5/60-(float)1.76/60*Math.sqrt(tt);
        double hA = Math.toDegrees(Math.atan(1/(Math.tan(Math.toRadians(Math.abs(lt-d)))+1)));
        Imsak=z-Deg(Math.acos(F+SinA(hz)/G))/15-(float)10/60+(float)ihT/60;
        Shubuh=z-Deg(Math.acos(F+SinA(hz)/G))/15+(float)ihT/60;
        Terbit=z-Deg(Math.acos(F+SinA(hm)/G))/15-(float)3/60;
        Dluha=z-Deg(Math.acos(F+SinA(4.5)/G))/15+(float)ihT/60;
        Dhuhur=z+(float)3/60;
        Ashar=z+Deg(Math.acos(F+SinA(hA)/G))/15+(float)ihT/60;
        Maghrib=z+Deg(Math.acos(F+SinA(hm)/G))/15+(float)ihT/60;
        Isya=z+Deg(Math.acos(F+SinA(hu)/G))/15+(float)ihT/60;
        double LamaM,NfM;
        LamaM=((Shubuh+24-(float)ihT/60)-(Maghrib-(float)ihT/60)-(float)ihT/60);
        NfM=ModFDiv(Maghrib+(2*(LamaM/3)),24);
        double wis= 12-z;
        double Smalam=ModFDiv(Maghrib+(LamaM/2),24);

        return new double[]{0,Imsak,Shubuh,Terbit,Dluha,Dhuhur,Ashar,Maghrib,Isya,NfM,wis,Smalam};

    }

    public static double[] sholat(double Tgl,double Bln,double Thn,double tz,double lt,float  iht,
                                  double bt,double tt){
        double jd = KMJDf(Tgl,Bln,Thn,12,tz);
        double jde = jd ;//+ DeltaT(jd)/86400;
        double dec = SunApparentDeclination(jde);
        double sd = SunAngularSemiDiameter(jde);
        double eqt = EquationOfTime(jde);
        double z=12-eqt+((tz*15)-bt)/15;
        double h = 0-sd-(float)34.5/60-(float)1.76/60*Math.sqrt(tt);
        double hA = ATAN(1/(TAN(ABS(lt-dec))+1));
        double Imsak=z-ACOS(SIN(-20)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15-(float)10/60+iht;
        double Shubuh=z-ACOS(SIN(-20)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15+iht;
        double Terbit=z-ACOS(SIN(h)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15-iht;
        double Dluha=z-ACOS(SIN(4.5)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15+iht;
        double Dhuhur=z+(float)3/60;
        double Ashar=z+ACOS(SIN(hA)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15+iht;
        double Maghrib=z+ACOS(SIN(h)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15+iht;
        double Isya=z+ACOS(SIN(-18)/COS(lt)/COS(dec) - TAN(lt)*TAN(dec))/15+iht;
        double LamaMalam=ModFDiv(Shubuh-Maghrib,24);
        double Smalam=ModFDiv(Maghrib+(LamaMalam/2),24);
        double Tmalam=ModFDiv(Maghrib+((LamaMalam/3)*2),24);

        double tfwt = eqt+(bt-tz*15)/15;
        return new double[]{0,Imsak,Shubuh,Terbit,Dluha,Dhuhur,Ashar,Maghrib,Isya,Smalam,Tmalam,tfwt};

    }

    public static String Hmssholat1(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >0.0) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + " : "
                + (new DecimalFormat("00")).format((long)((int)menit))
        ;
        return s;
    }
    public static String Hmssterbit1(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >0.0) {
            detik = 0;menit=mnt; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + " : "
                + (new DecimalFormat("00")).format((long)((int)menit))
        ;
        return s;
    }
    public static String JDKH(double Jd, String
            OpsiHasil ){
        double  h, I, K, L, N, P, Q, R, S, T, U;
        double V, W, Z, Mh, a;
        double TglH, ThnH;
        double NoHrM, NoPsM;
        double PA, PB, Masehi, Asapon;
        h = Jd - 1948440;
        I = h + 10632;
        K = Math.floor((I - 1) / 10631);
        L = I - 10631 * K + 354;
        N = Math.floor((10985 - L) / 5316);
        P = Math.floor((50 * L) / 17719);
        Q = Math.floor(L / 5670);
        R = Math.floor((43 * L) / 15238);
        S = N * P + Q * R;
        T = Math.floor((30 - S) / 15);
        U = Math.floor((17719 * S) / 50);
        V = Math.floor(S / 16);
        W = Math.floor((15238 * S) / 43);
        Z = L - T * U - V * W + 29;
        Mh = Math.floor((24 * Z) / 709);
        String [] BlnH = {" Dzul Hijjah", " Muharam", " Safar", " R. Awal", " R. Akhir", " J. Awal",
                " J. Akhir", " Rojab", " Sya'ban", " Ramadhan", " Syawal",
                " Dzul Qo'dah", " Dzul Hijjah"};
        String NmBlnH =BlnH[(int)Mh];
        a = Math.floor((709 * Mh) / 24);
        TglH = Z - a;
        if(TglH<1){TglH=30;}else{TglH=TglH;}
        ThnH = 30 * K + S - 30;
        PA = Math.floor(Jd) + 3;
        PB = PA - 2;
        NoHrM = PA - 7 * Math.floor(PA / 7);
        NoPsM = PB - 5 * Math.floor(PB / 5);
        String [] NmHrMDt = {"Jum'at", "Sabtu", "Ahad", "Senin", "Selasa",
                "Rabu", "Kamis", "Jum'at"};
        String []NmPsMDt = {"Kliwon", "Legi", "Pahing", "Pon", "Wage", "Kliwon"};
        String NmHrM = NmHrMDt[(int)NoHrM];
        String NmPsM = NmPsMDt[(int)NoPsM];
        String Hasil="";
        switch  (OpsiHasil){
            case "Harpas": Hasil = NmHrM+ " " + NmPsM;
            case "Tgl" :Hasil =(int)TglH+" "+ NmBlnH + " " +(int)ThnH;
        }

        return Hasil;
    }
    public static double Int(double data){
        return Math.floor(data);
    }

    public static String jdtohj(double JD){
        double hijri=JD-1948439;
        double thnh = Math.floor((int)hijri/(354.36666667));
        int ThH= (int)thnh+1;
        double Blnh1 = ((int)thnh * 354.36666667 );
        double Blnh2 = Blnh1 - Math.floor(Blnh1);
        double Blnh3 = 0;
        if(Blnh2 >0.5){Blnh3=Blnh1+1;} else {Blnh3=Blnh1;}
        int hrh = (int)hijri-(int)Blnh3;
        double bln = (int)Math.floor((hrh)/29.5);
        double hr = Math.floor(bln*29.5);
        int hr1 = hrh-(int)hr;
        if(hrh-(int)hr==0){bln=bln-1;} else {bln=bln;}
        if(hr1==0){hr1=30;}else{hr1=hr1;}

        String[] BlnH = {"Dzulhijjah","Muharram","Shafar","R.Awal","R.Tsani","J.Ula","J.Tsani","Rajab","Sya'ban","Ramadlan","Syawal","Dzul Qa'dah","Dzulhijjah"};
        String BulanH = BlnH[(int)(bln+1)];
        String hsl = hr1 +" "+BulanH+" "+ThH+" H";
        return hsl;
    }

    public static double dmsKeDesimal(double derajat, double menit, double detik) {
        if (derajat < 0 || menit < 0 || detik < 0)
            return derajat - (Math.abs(menit) / 60) - (Math.abs(detik) / 3600);//Bila salah satu nilainya negatif
        else return derajat + (menit / 60) + (detik / 3600);
    }
    public static double ABS (double data){
        return Math.abs(data);
    }

    public static String hijri(int i) {
        switch (i) {
            case 1:
                return "Muharram";
            case 2:
                return "Safar";
            case 3:
                return "R. Awal";
            case 4:
                return "R. Akhir";
            case 5:
                return "J. Ula";
            case 6:
                return "J. Tsani";
            case 7:
                return "Rajab";
            case 8:
                return "Sya'ban";
            case 9:
                return "Ramadhan";
            case 10:
                return "Syawal";
            case 11:
                return "Dzulqo'dah";
            case 12:
                return "Dzulhijjah";
            default:
                return "";
        }
    }

    public static String masehi(int i) {
        switch (i) {
            case 1:
                return "Januari";
            case 2:
                return "Februari";
            case 3:
                return "Maret";
            case 4:
                return "April";
            case 5:
                return "Mei";
            case 6:
                return "Juni";
            case 7:
                return "Juli";
            case 8:
                return "Agustus";
            case 9:
                return "September";
            case 10:
                return "Oktober";
            case 11:
                return "November";
            case 12:
                return "Desember";
            default:
                return "";
        }
    }

    public static double TanggalKeJulianDay(double d, double d2, double d3, double d4, double d5, double d6) {
        double d7;
        double d8;
        if (d2 <= 2.0d) {
            d8 = d2 + 12.0d;
            d7 = d - 1.0d;
        } else {
            d7 = d;
            d8 = d2;
        }
        int i = 0;
        if ((d8 / 100.0d) + d7 + d3 >= 158.1015d) {
            int i2 = (int) (d7 / 100.0d);
            i = ((i2 / 4) + 2) - i2;
        }
        return ((double) ((int) (d7 * 365.25d))) + 1720994.5d + ((double) ((int) ((d8 + 1.0d) * 30.60001d))) + d3 + ((double) i) + (((d4 + (d5 / 60.0d)) + (d6 / 3600.0d)) / 24.0d);
    }
    public static double[] MasehiKeHijri(double d, double d2, double d3) {
        int i = 0;
        int i2;
        int i3;
        double d4 = 0;
        double d5;
        double TanggalKeJulianDay = TanggalKeJulianDay(d, d2, d3, 0.0d, 0.0d, 0.0d);
        double d6 = TanggalKeJulianDay - 1948438.5d;
        int i4 = (int) ((d6 - 1.0d) / 10631.0d);
        int i5 = i4 * 30;
        double d7 = d6 - ((double) (i4 * 10631));
        if (d7 >= 1.0d && d7 <= 354.0d) {
            i2 = (int) d7;
            i = 1;
        } else if (d7 < 355.0d || d7 > 709.0d) {
            double d8 = 1063.0d;
            if (d7 < 710.0d || d7 > 1063.0d) {
                if (d7 < 1064.0d || d7 > 1417.0d) {
                    d8 = 1772.0d;
                    if (d7 >= 1418.0d && d7 <= 1772.0d) {
                        i = 5;
                        d5 = d7 - 1417.0d;
                        i2 = (int) d5;
                    } else if (d7 < 1772.0d || d7 > 2126.0d) {
                        if (d7 >= 2127.0d && d7 <= 2481.0d) {
                            i3 = 7;
                            d4 = 2126.0d;
                        } else if (d7 >= 2482.0d && d7 <= 2835.0d) {
                            i3 = 8;
                            d4 = 2481.0d;
                        } else if (d7 >= 2836.0d && d7 <= 3189.0d) {
                            i3 = 9;
                            d4 = 2835.0d;
                        } else if (d7 >= 3190.0d && d7 <= 3544.0d) {
                            i3 = 10;
                            d4 = 3189.0d;
                        } else if (d7 >= 3545.0d && d7 <= 3898.0d) {
                            i3 = 11;
                            d4 = 3544.0d;
                        } else if (d7 >= 3899.0d && d7 <= 4252.0d) {
                            i3 = 12;
                            d4 = 3898.0d;
                        } else if (d7 >= 4253.0d && d7 <= 4607.0d) {
                            i3 = 13;
                            d4 = 4252.0d;
                        } else if (d7 >= 4608.0d && d7 <= 4961.0d) {
                            i3 = 14;
                            d4 = 4607.0d;
                        } else if (d7 >= 4962.0d && d7 <= 5315.0d) {
                            i3 = 15;
                            d4 = 4691.0d;
                        } else if (d7 >= 5316.0d && d7 <= 5670.0d) {
                            i3 = 16;
                            d4 = 5315.0d;
                        } else if (d7 >= 5671.0d && d7 <= 6024.0d) {
                            i3 = 17;
                            d4 = 5670.0d;
                        } else if (d7 >= 6025.0d && d7 <= 6379.0d) {
                            i3 = 18;
                            d4 = 6024.0d;
                        } else if (d7 >= 6380.0d && d7 <= 6733.0d) {
                            i3 = 19;
                            d4 = 6379.0d;
                        } else if (d7 >= 6734.0d && d7 <= 7087.0d) {
                            i3 = 20;
                            d4 = 6733.0d;
                        } else if (d7 >= 7088.0d && d7 <= 7442.0d) {
                            i3 = 21;
                            d4 = 7087.0d;
                        } else if (d7 < 7443.0d || d7 > 7796.0d) {
                            d8 = 8150.0d;
                            if (d7 >= 7797.0d && d7 <= 8150.0d) {
                                i3 = 23;
                                d4 = 7796.0d;
                            } else if (d7 >= 8150.0d && d7 <= 8505.0d) {
                                i = 24;
                            } else if (d7 >= 8506.0d && d7 <= 8859.0d) {
                                i3 = 25;
                                d4 = 8505.0d;
                            } else if (d7 >= 8860.0d && d7 <= 9214.0d) {
                                i3 = 26;
                                d4 = 8859.0d;
                            } else if (d7 >= 9215.0d && d7 <= 9568.0d) {
                                i3 = 27;
                                d4 = 9214.0d;
                            } else if (d7 >= 9569.0d && d7 <= 9922.0d) {
                                i3 = 28;
                                d4 = 9568.0d;
                            } else if (d7 >= 9923.0d && d7 <= 10277.0d) {
                                i3 = 29;
                                d4 = 9922.0d;
                            } else if (d7 < 10277.0d || d7 > 10631.0d) {
                                i2 = 0;
                                i = 0;
                            } else {
                                i2 = (int) (d7 - 10277.0d);
                                i = 30;
                            }
                        } else {
                            i3 = 22;
                            d4 = 7445.0d;
                        }
                        d5 = d7 - d4;
                        i2 = (int) d5;
                    } else {
                        i = 6;
                    }
                } else {
                    i = 4;
                }
                d5 = d7 - d8;
                i2 = (int) d5;
            } else {
                i2 = (int) (d7 - 709.0d);
                i = 3;
            }
        } else {
            i2 = (int) (d7 - 354.0d);
            i = 2;
        }
        int i6 = i2 == 355 ? 11 : (int) (((double) (i2 - 1)) / 29.5d);
        return new double[]{0.0d, (double) ((int) (((double) i2) - (i6 % 2 == 0 ? ((double) i6) * 29.5d : (((double) (i6 - 1)) * 29.5d) + 30.0d))), (double) (i6 + 1), (double) (i5 + i), TanggalKeJulianDay};
    }

    public static int[] JulianDayKeTanggal(double d) {
        double d2 = d + 0.5d;
        int i = (int) d2;
        double d3 = (double) i;
        double d4 = d2 - d3;
        if (i >= 2299161) {
            int i2 = (int) ((d3 - 1867216.25d) / 36524.25d);
            d3 = (double) (((i + 1) + i2) - (i2 / 4));
        }
        double d5 = d3 + 1524.0d;
        int i3 = (int) ((d5 - 122.1d) / 365.25d);
        double d6 = d5 - ((double) ((int) (((double) i3) * 365.25d)));
        int i4 = (int) (d6 / 30.60001d);
        double d7 = (d6 - ((double) ((int) (((double) i4) * 30.6001d)))) + d4;
        int i5 = (i4 == 14 || i4 == 15) ? i4 - 13 : i4 - 1;
        int i6 = (int) d7;
        double d8 = d7 - ((double) i6);
        double d9 = 24.0d * d8;
        int i7 = (int) d9;
        int i8 = (int) ((d9 - ((double) i7)) * 60.0d);
        return new int[]{0, i6, i5, i5 <= 2 ? i3 - 4715 : i3 - 4716, i7, i8, (int) (((d8 * 86400.0d) - ((double) (i7 * 3600))) - ((double) (i8 * 60)))};
    }

    public static double DeltaT(double JD) {

        double TlM ;
        double JDTlMAw ;
        double JDTlMAk ;
        double JHrlTlM ;
        double JHrTlM  ;
        double dY  ;
        double kU  ;
        double kT  ;
        double DltT = 0;
        double sCorr   ;
        TlM = JulianDayKeTanggal(JD)[3];
        JDTlMAw = KMJDf(1, 1, TlM, 0, 0);
        JDTlMAk = KMJDf(31, 12, TlM, 24, 0);
        JHrlTlM = JD - JDTlMAw;
        JHrTlM = JDTlMAk - JDTlMAw;
        dY = TlM + JHrlTlM / JHrTlM;
        if (dY <= -500) {
            kU = (dY - 1820) / 100;
            DltT = -20 + 32 * kU * kU ;
        }
        if ((dY > -500) && (dY <= 500)) {
            kU = dY / 100;
            DltT = 10583.6 - 1014.41 * kU + 33.78311 * Math.pow(kU,2) - 5.952053 * Math.pow(kU,3) - 0.1798452 * Math.pow(kU,4) + 0.022174192 * Math.pow(kU,5) + 0.0090316521 * Math.pow(kU,6) ;}
        if ((dY > 500) && (dY <= 1600)) {
            kU = (dY - 1000) / 100;
            DltT = 1574.2 - 556.01 * kU + 71.23472 * Math.pow(kU,2) + 0.319781 * Math.pow(kU,3) - 0.8503463 * Math.pow(kU,4) - 0.005050998 * Math.pow(kU,5) + 0.0083572073 * Math.pow(kU,6) ;}
        if ((dY > 1600) && (dY <= 1700)) {
            kT = dY - 1600;
            DltT = 120 - 0.9808 * kT - 0.01532 * Math.pow(kT,2) + Math.pow(kT,3) / 7129 ;}
        if ((dY > 1700) && (dY <= 1800)) {
            kT = dY - 1700;
            DltT = 8.83 + 0.1603 * kT - 0.0059285 * Math.pow(kT,2) + 0.00013336 * Math.pow(kT,3) - Math.pow(kT,4) / 1174000 ;}
        if ((dY > 1800) && (dY <= 1860)) {
            kT = dY - 1800;
            DltT = 13.72 - 0.332447 * kT + 0.0068612 * Math.pow(kT,2) + 0.0041116 * Math.pow(kT,3) - 0.00037436 * Math.pow(kT,4) + 0.0000121272 * Math.pow(kT,5) - 0.0000001699 * Math.pow(kT,6) + 0.000000000875 * Math.pow(kT,7) ;}
        if ((dY > 1860) && (dY <= 1900)) {
            kT = dY - 1860;
            DltT = 7.62 + 0.5737 * kT - 0.251754 * Math.pow(kT,2) + 0.01680668 * Math.pow(kT,3) - 0.0004473624 * Math.pow(kT,4) + Math.pow(kT,5) / 233174 ;}
        if ((dY > 1900) && (dY <= 1920)) {
            kT = dY - 1900;
            DltT = -2.79 + 1.494119 * kT - 0.0598939 * Math.pow(kT,2) + 0.0061966 * Math.pow(kT,3) - 0.000197 * Math.pow(kT,4) ;}
        if ((dY > 1920) && (dY <= 1941)) {
            kT = dY - 1920;
            DltT = 21.2 + 0.84493 * kT - 0.0761 * Math.pow(kT,2) + 0.0020936 * Math.pow(kT,3) ;}
        if ((dY > 1941) && (dY <= 1961)) {
            kT = dY - 1950;
            DltT = 29.07 + 0.407 * kT - Math.pow(kT,2) / 233 + Math.pow(kT,3) / 2547 ;}
        if ((dY > 1961) && (dY <= 1986)) {
            kT = dY - 1975;
            DltT = 45.45 + 1.067 * kT - Math.pow(kT,2) / 260 - Math.pow(kT,3) / 718 ;}
        if ((dY > 1986) && (dY <= 2005)) {
            kT = dY - 2000;
            DltT = 63.86 + 0.3345 * kT - 0.060374 * Math.pow(kT,2) + 0.0017275 * Math.pow(kT,3) + 0.000651814 * Math.pow(kT,4) + 0.00002373599 * Math.pow(kT,5) ;}
        if ((dY > 2005) && (dY <= 2050)) {
            kT = dY - 2000;
            DltT = 62.92 + 0.32217 * kT + 0.005589 * Math.pow(kT,2) ;}
        if ((dY > 2050) && (dY <= 2150)) {
            DltT = -20 + 32 * Math.pow(((dY - 1820) / 100), 2 )- 0.5628 * (2150 - dY) ;}
        if (dY > 2150) {
            kU = (dY - 1820) / 100;
            DltT = -20 + 32 * Math.pow(kU,2) ;}
        if (dY < 1955 || dY > 2005) {
            sCorr = -0.000012932 * Math.pow(dY - 1955,2);
            DltT = DltT + sCorr;}
        else {
            sCorr = 0;
            DltT = DltT;}

        return DltT ;
    }
    public static double KMJDf(double TglM,double BlnM,double ThnM,double JamDes, double Tz) {
        double DDUT,MM,YM,A,B;
        DDUT = (TglM + (JamDes - Tz)/ 24);
        if (BlnM > 2) {MM = BlnM;YM = ThnM;}
        else { MM = (BlnM + 12); YM = ThnM - 1;};
        if ((ThnM + (BlnM / 100)+TglM / 10000)>= 1582.1015)
        {A = Math.floor(YM / 100); B = (2 - A) + Math.floor(A / 4);}
        else { A = 0; B = 0;};
        return  Math.floor(365.25 * (YM + 4716))
                + Math.floor(30.6001 * (MM + 1)) + (DDUT + (B - 1524.5));

    }
    public static double JDKMM(double JD, double TimeZone, String Pilihan){
        double CJD         ;
        double Z           ;
        double F           ;
        double JamDes      ;
        double Alpha       ;
        double A           ;
        double B           ;
        double C           ;
        double D           ;
        double E           ;
        double TglM        ;
        double BlnM = 0;
        double ThnM = 0;
        String ThnMAYNS    ;
        String ThnMHYNS    ;

        String NmBlnM      ;
        int NoHrM       ;
        String NmHrMDt     ;
        String NmHrM       ;
        int NoPsM       ;
        String NmPsMDt     ;
        String NmPsM       ;
        String Result      ;

        CJD = JD + 0.5 + (TimeZone / 24);
        Z = Math.floor(CJD);
        F = CJD - Z;
        JamDes = F * 24;

        if (Z >= 2299161) {
            Alpha = Math.floor((Z - 1867216.25) / 36524.25);
            A = Z + 1 + Alpha - Math.floor(Alpha / 4);
        }
        else  {  Alpha = 0;
            A = Z;}

        B = A + 1524;
        C = Math.floor((B - 122.1) / 365.25);
        D = Math.floor(365.25 * C);
        E = Math.floor((B - D) / 30.6001);
        TglM = B - D - Math.floor(30.6001 * E);
        if (E < 14) {
            BlnM = E - 1;
        }

        else if ((E == 14)||(E == 15)){
            BlnM = E - 13;
        }

        if (BlnM > 2) {
            ThnM = C - 4716;
        }

        else if ((BlnM == 1) || (BlnM == 2)) {
            ThnM = C - 4715;
        }

        if (ThnM > 0) {
            ThnMHYNS = ThnM + " M";
            ThnMAYNS = "+" + ThnM;
        }

        else {
            ThnMHYNS = Math.abs((int) ThnM) + 1 + " SM";
            ThnMAYNS = String.valueOf(ThnM);
        }

        double hasil=0;

        switch (Pilihan) {
            case "Tgl" :
            case "tgl":
                hasil= TglM;
                break;
            case "bln":
            case "Bln":
                hasil = BlnM;
                break;
            case "Thn":
            case "thn":
                hasil = ThnM;
                break;
            case "Jam":
            case "jam":
                hasil = JamDes;
                break;
        }
        return hasil;

    }
    public static String JDKM(double JD, double TimeZone, String Pilihan){
        double CJD         ;
        double Z           ;
        double F           ;
        double JamDes      ;
        double Alpha       ;
        double A           ;
        double B           ;
        double C           ;
        double D           ;
        double E           ;
        double TglM        ;
        double BlnM = 0;
        double ThnM = 0;
        String ThnMAYNS    ;
        String ThnMHYNS    ;

        String NmBlnM      ;
        int NoHrM       ;
        String NmHrMDt     ;
        String NmHrM       ;
        int NoPsM       ;
        String NmPsMDt     ;
        String NmPsM       ;
        String Result      ;

        CJD = JD + 0.5 + (TimeZone / 24);
        Z = Math.floor(CJD);
        F = CJD - Z;
        JamDes = F * 24;

        if (Z >= 2299161) {
            Alpha = Math.floor((Z - 1867216.25) / 36524.25);
            A = Z + 1 + Alpha - Math.floor(Alpha / 4);
        }
        else  {  Alpha = 0;
            A = Z;}

        B = A + 1524;
        C = Math.floor((B - 122.1) / 365.25);
        D = Math.floor(365.25 * C);
        E = Math.floor((B - D) / 30.6001);
        TglM = B - D - Math.floor(30.6001 * E);
        if (E < 14) {
            BlnM = E - 1;
        }

        else if ((E == 14)||(E == 15)){
            BlnM = E - 13;
        }

        if (BlnM > 2) {
            ThnM = C - 4716;
        }

        else if ((BlnM == 1) || (BlnM == 2)) {
            ThnM = C - 4715;
        }

        if (ThnM > 0) {
            ThnMHYNS = ThnM + " M";
            ThnMAYNS = "+" + ThnM;
        }

        else {
            ThnMHYNS = Math.abs((int) ThnM) + 1 + " SM";
            ThnMAYNS = String.valueOf(ThnM);
        }
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

        NmBlnM = NmBlnMDt [(int)BlnM ]    ;
        String hasil="";

        switch (Pilihan) {
            case "Tgl" :
            case "tgl":
                hasil= String.valueOf((int)TglM);
                break;
            case "bln":
            case "Bln":
                hasil = NmBlnM;
                break;
            case "Thn":
            case "thn":
                hasil = String.valueOf((int)ThnM);
                break;
            case "Jam":
            case "jam":
                hasil = String.valueOf(JamDes);
                break;
            case "TBT":
            case "tbt":
                hasil =(int)TglM +" "+NmBlnM+" "+(int)ThnM;
                break;
        }
        return hasil;

    }
    public static double Phases(double k,int Phase) {

        //From a code by Michael Friedrich
//found at http://members.aon.at/excelapps/excelapps.htm#kalender
        double T, JDE, E, M, MS, F, Omega;
        double A1, A2, A3, A4, A5, A6, A7, A8;
        double A9, A10, A11, A12, A13, A14;
        double PT = 0, W = 0, PK;
        double y;
        k=k + Phase * 0.25;
        T=k / 1236.85;
        JDE=2451550.09765 + 29.530588853 * k + 0.0001337 * Math.pow(T,2) - 0.00000015 * Math.pow(T,3) + 0.00000000073 * Math.pow(T,4);
        E=1 - 0.002516 * T - 0.0000074 * Math.pow(T,2);
        M=2.5534 + 29.10535669 * k - 0.0000218 * Math.pow(T,2) - 0.00000011 * Math.pow(T,3);
        MS=201.5643 + 385.81693528 * k + 0.0107438 * Math.pow(T,2) + 0.00001239 * Math.pow(T,3) - 0.000000058 * Math.pow(T,4);
        F=160.7108 + 390.67050274 * k - 0.0016341 * Math.pow(T,2) - 0.00000227 * Math.pow(T,3) + 0.000000011 * Math.pow(T,4);
        Omega=124.7746 - 1.5637558 * k + 0.0020691 * Math.pow(T,2) + 0.00000215 * Math.pow(T,3);
        M=Rad(ModFDiv(M, 360));
        MS=Rad(ModFDiv(MS, 360));
        F=Rad(ModFDiv(F, 360));
        Omega=Rad(ModFDiv(Omega, 360));

        A1=Rad(ModFDiv(299.77 + 0.107408 * k - 0.009173 * Math.pow(T,2), 360));
        A2=Rad(ModFDiv(251.88 + 0.016321 * k, 360));
        A3=Rad(ModFDiv(251.83 + 26.651886 * k, 360));
        A4=Rad(ModFDiv(349.42 + 36.412478 * k, 360));
        A5=Rad(ModFDiv(84.66 + 18.206239 * k, 360));
        A6=Rad(ModFDiv(141.74 + 53.303771 * k, 360));
        A7=Rad(ModFDiv(207.14 + 2.453732 * k, 360));
        A8=Rad(ModFDiv(154.84 + 7.30686 * k, 360));
        A9=Rad(ModFDiv(34.52 + 27.261239 * k, 360));
        A10=Rad(ModFDiv(207.19 + 0.121824 * k, 360));
        A11=Rad(ModFDiv(291.34 + 1.844379 * k, 360));
        A12=Rad(ModFDiv(161.72 + 24.198154 * k, 360));
        A13=Rad(ModFDiv(239.56 + 25.513099 * k, 360));
        A14=Rad(ModFDiv(331.55 + 3.592518 * k, 360));
        //Periodische Terme Neumond
        if(Phase == 0) {
            PT = -0.4072 * Sin(MS) + 0.17241 * E * Sin(M) + 0.01608 * Sin(2 * MS)
                    + 0.01039 * Sin(2 * F) + 0.00739 * E * Sin(MS - M) - 0.00514 * E * Sin(MS + M)
                    + 0.00208 * E * E * Sin(2 * M) - 0.00111 * Sin(MS - 2 * F) - 0.00057 * Sin(MS + 2 * F)
                    + 0.00056 * E * Sin(2 * MS + M) - 0.00042 * Sin(3 * MS) + 0.00042 * E * Sin(M + 2 * F)
                    + 0.00038 * E * Sin(M - 2 * F) - 0.00024 * E * Sin(2 * MS - M)
                    - 0.00017 * Sin(Omega) - 0.00007 * Sin(MS + 2 * M) + 0.00004 * Sin(2 * MS - 2 * F)
                    + 0.00004 * Sin(3 * M) + 0.00003 * Sin(MS + M - 2 * F) + 0.00003 * Sin(2 * MS + 2 * F)
                    - 0.00003 * Sin(MS + M + 2 * F) + 0.00003 * Sin(MS - M + 2 * F) - 0.00002 * Sin(MS - M - 2 * F)
                    - 0.00002 * Sin(3 * MS + M) + 0.00002 * Sin(4 * MS);
        }
        //Periodische Terme Vollmond
        if (Phase == 2) {
            PT = -0.40614 * Sin(MS) + 0.17302 * E * Sin(M) + 0.01614 * Sin(2 * MS)
                    + 0.01043 * Sin(2 * F) + 0.00734 * E * Sin(MS - M) - 0.00515 * E * Sin(MS + M)
                    + 0.00209 * E * E * Sin(2 * M) - 0.00111 * Sin(MS - 2 * F) - 0.00057 * Sin(MS + 2 * F)
                    + 0.00056 * E * Sin(2 * MS + M) - 0.00042 * Sin(3 * MS) + 0.00042 * E * Sin(M + 2 * F)
                    + 0.00038 * E * Sin(M - 2 * F) - 0.00024 * E * Sin(2 * MS - M)
                    - 0.00017 * Sin(Omega) - 0.00007 * Sin(MS + 2 * M) + 0.00004 * Sin(2 * MS - 2 * F)
                    + 0.00004 * Sin(3 * M) + 0.00003 * Sin(MS + M - 2 * F) + 0.00003 * Sin(2 * MS + 2 * F)
                    - 0.00003 * Sin(MS + M + 2 * F) + 0.00003 * Sin(MS - M + 2 * F) - 0.00002 * Sin(MS - M - 2 * F)
                    - 0.00002 * Sin(3 * MS + M) + 0.00002 * Sin(4 * MS);
        }
        //Periodische Terme erstes und letztes Phase
        if(Phase == 1 || Phase == 3) {
            PT = -0.62801 * Sin(MS) + 0.17172 * E * Sin(M) - 0.01183 * E * Sin(MS + M)
                    + 0.00862 * Sin(2 * MS) + 0.00804 * Sin(2 * F) + 0.00454 * E * Sin(MS - M)
                    + 0.00204 * E * E * Sin(2 * M) - 0.0018 * Sin(MS - 2 * F) - 0.0007 * Sin(MS + 2 * F)
                    - 0.0004 * Sin(3 * MS) - 0.00034 * E * Sin(2 * MS - M) + 0.00032 * E * Sin(M + 2 * F)
                    + 0.00032 * E * Sin(M - 2 * F) - 0.00028 * E * E * Sin(MS + 2 * M) + 0.00027 * E * Sin(2 * MS + M)
                    - 0.00017 * Sin(Omega) - 0.00005 * Sin(MS - M - 2 * F) + 0.00004 * Sin(2 * MS + 2 * F)
                    - 0.00004 * Sin(MS + M + 2 * F) + 0.00004 * Sin(MS - 2 * M) + 0.00003 * Sin(MS + M - 2 * F)
                    + 0.00003 * Sin(3 * M) + 0.00002 * Sin(2 * MS - 2 * F) + 0.00002 * Sin(MS - M + 2 * F)
                    - 0.00002 * Sin(3 * MS + M);
            W = 0.00306 - 0.00038 * E * Cos(M) + 0.00026 * Cos(MS)
                    - 0.00002 * Cos(MS - M) + 0.00002 * Cos(MS + M) + 0.00002 * Cos(2 * F);
            if(Phase == 3) {W*=-1;} else {return W;}
        }
        PK=0.000325 * Sin(A1) + 0.000165 * Sin(A2) + 0.000164 * Sin(A3)
                + 0.000126 * Sin(A4) + 0.00011 * Sin(A5) + 0.000062 * Sin(A6)
                + 0.00006 * Sin(A7) + 0.000056 * Sin(A8) + 0.000047 * Sin(A9)
                + 0.000042 * Sin(A10) + 0.00004 * Sin(A11) + 0.000037 * Sin(A12)
                + 0.000035 * Sin(A13) + 0.000023 * Sin(A14);

        return JDE + PK + PT + W;
    }
    public static String DmsS1(double data){
        String s = " ";
        if (data < 0) {
            data = Math.abs(data);}

        double mnt = (data - (int)data) * 60;
        double dtk = (mnt - (int)mnt) * 60;
        double menit, detik;
        if (dtk >59.9999999) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.99999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};
        detik=AskRound2(dtk);
        String A1;
        A1=String.valueOf(detik);
        s=  A1;//new DecimalFormat("00,00").format(dtk);
        return s;

    }

    public static String DmsD(double data){
        String s="";
        if(data < 0) {data =Math.abs(data);
        }
        s+= new DecimalFormat ("00").format((int)data)
        ;

        return s;
    }

    public static String DmsM(double data){
        String s="";
        if(data < 0) {data =Math.abs(data);
        }
        double mnt = (data -(int)data) * 60;
        s+=  new DecimalFormat("00").format((int)mnt)
        ;

        return s;
    }
    public static String Hms0(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.999) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.9991) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + ":"
                + (new DecimalFormat("00")).format((long)((int)menit)) + ":"
                + (new DecimalFormat("00")).format(detik);
        return s;
    }
    public static String Hms00(double data) {
        String s = " ";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + " -"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.999) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + ":"
                + (new DecimalFormat("00")).format((long)((int)menit)) + ":"
                + (new DecimalFormat("00.00")).format(detik);
        return s;
    }
    public static String Hmssholat(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >0.0) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + ":"
                + (new DecimalFormat("00")).format((long)((int)menit))
        ;
        return s;
    }
    public static String Hmssterbit(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >0.0) {
            detik = 0;menit=mnt; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + ":"
                + (new DecimalFormat("00")).format((long)((int)menit))
        ;
        return s;
    }
    public static String Dms3(double data) {
        String s="";
        if(data < 0) {data =Math.abs(data);
            s +="-";}
        double mnt = (data -(int)data) * 60;
        double dtk = (mnt - (int)mnt) * 60.0;
        if(dtk==60){dtk=0 ; mnt++;}
        else {dtk=dtk;mnt=mnt; }
        s+= new DecimalFormat ("00").format((int)data) +"˚"+
                new DecimalFormat("00").format((int)mnt) +"'"+
                new DecimalFormat("00").format(Math.floor(dtk))+"''";

        return s;
    }

    public static String Dms4(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+" ";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.9) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        s = s
                + (new DecimalFormat("00")).format((long)((int)menit)) + "' "
                + (new DecimalFormat("00.00")).format(detik)+ "'' ";
        return s;
    }
    public static String Dms5(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+" ";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.9) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        s = s
                + (new DecimalFormat("00")).format((long)((int)menit)) + "m "
                + (new DecimalFormat("00.00")).format(detik)+ "s ";
        return s;
    }

    public static String Dms7(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+" ";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.9) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};
        s = s + (new DecimalFormat("00")).format((long)((int)data)) + "d " + (new DecimalFormat("00")).format((long)((int)menit)) + "m " + (new DecimalFormat("00")).format(detik)+ "s ";
        return s;

    }
    public static String Dms8(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+" ";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.9) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};
        s = s + (new DecimalFormat("00.00")).format(detik)+ "'' ";
        return s;
    }
    public static String DmsS(double data){
        String s = " ";
        if (data < 0.0D) {
            data = Math.abs(data);}

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik, dd,ee;
        if (dtk >59.994) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.1) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        dd = (detik-(double)((int)detik))*3600;
        s = Des(detik);
        return s;

    }

    public static String Des(double Data) {

        DecimalFormat df = new DecimalFormat("0.00000000");
        return df.format(( Data));
    }
    public static String Des2(double Data) {

        DecimalFormat df = new DecimalFormat("00.00");
        return df.format(( Data));
    }
    public static String des3(double data){
        return (new DecimalFormat("0.00")).format((data)) ;
    }
    //Koding Pembantu Utama
    public static String Dms(double data) {
        String s = "";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.994) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.9999) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + "°"
                + (new DecimalFormat("00")).format((long)((int)menit)) + "'"
                + (new DecimalFormat("00.00")).format(( detik))+ "''";
        return s;
    }

    public static String [] DMs(double data) {
        String s = " ";
        String p = " ";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = "S";
            p = "N";}
        else { s="U";p="P";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik,mdtk;

        if (dtk >59.994) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.1) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        String dr = (new DecimalFormat("00")).format((long)((int)data));
        String mn= (new DecimalFormat("00")).format((long)((int)menit));
        String dt =String.format(Locale.US,"%.2f", detik);

        return new String [] {"",dr,mn,dt,s,p};
    }

    public static String DDms(double seconds) {

        seconds*=3600;
        long ms = (long)seconds*60*60*1000 %100;
        long s = (long)seconds % 60;
        long m = (long)(seconds / 60) % 60;
        long h = (long)(seconds / (60 * 60)) ;
        return String.format("%02d°%02d'%02d.%03d''", h,m,s,ms);
    }
    public static String Hms(double data) {
        String s = " ";
        if (data < 0.0D) {
            data = Math.abs(data);
            s = s + "-"; }
        else { s=s+"";};

        double mnt = (data - (double)((int)data)) * 60.0D;
        double dtk = (mnt - (double)((int)mnt)) * 60.0D;
        double menit, detik;
        if (dtk >59.999) {
            detik = 0;menit=mnt+1; }
        else { detik=dtk;menit=mnt;};

        if (menit >59.1) {
            menit = 0;data=data+1; }
        else { menit=menit;data=data;};

        s = s + (new DecimalFormat("00")).format((long)((int)data)) + ":"
                + (new DecimalFormat("00")).format((long)((int)menit)) + ":"
                + (new DecimalFormat("00.00")).format(detik);
        return s;
    }

    public static double ModFDiv(double data, double data1) {
        return data - data1 * Math.floor(data/data1);
    }

    public static double Rad(double Deg){
        return Deg * (Math.atan(1) / 45);
    }

    public static double Deg(double Rad){
        return Rad* (45 / Math.atan(1));
    }
    public static double ASIN(double number){
        double hsl;
        if (Math.abs(number) == 1) {
            hsl =(2 * Math.atan(1))*number;}
        else { hsl = Math.atan(number/Math.sqrt(-number*number+1));}
        return Deg(hsl);
    }
    public static double ACOS(double number){
        double hsl;
        if (Math.abs(number) == 1) {
            hsl =(2 * Math.atan(1))*Math.abs(1 - number);}
        else { hsl = Math.atan(-number/Math.sqrt(-number*number+1))+2*Math.atan(1);}
        return Deg(hsl);
    }
    public static double ATAN(double number){
        return Deg( Math.atan(number));
    }
    public static double SIN(double number){
        return Math.sin(Rad(number));
    }
    public static double COS(double number){
        return Math.cos(Rad(number));
    }
    public static double TAN(double number){
        return Math.tan(Rad(number));
    }

    public static double SinA(double Data){
        return Math.sin(Rad(Data));
    }

    public static double CosA(double Data){
        return Math.cos(Rad(Data));
    }

    public static double TanA(double Data){
        return Math.tan(Rad(Data));
    }

    public static double Asn(double number){
        double hsl;
        if (Math.abs(number) == 1) {
            hsl =(2 * Math.atan(1))*number;}
        else { hsl = Math.atan(number/Math.sqrt(-number*number+1));}
        return hsl;
    }

    public static double Acs(double number){
        double hsl;
        if (Math.abs(number) == 1) {
            hsl =(2 * Math.atan(1))*Math.abs(1 - number);}
        else { hsl = Math.atan(-number/Math.sqrt(-number*number+1))+2*Math.atan(1);}
        return hsl;
    }
    public static double Atn(double number){
        return Math.atan(number);
    }
    public static double Sin(double number){
        return Math.sin(number);
    }
    public static double Cos(double number){
        return Math.cos(number);
    }
    public static double Tan(double number){
        return Math.tan(number);
    }
    public static double Atn2(double y,double x){
        return Math.atan2(y,x);
    }
    public static double AskRound2(double Data){
        double hsl;
        double A, B, C, D, E, F;
        A=(int) Data;
        B=(Data-A) *100;
        C=(int) B;
        D=B-C;
        if (D>0.5D) {E=1;}
        else {E=0;}
        F=A+(C+E) /100;
        hsl=F;
        return hsl;
    }

    public static String JdtoHarpas(double data,double tz){
        int A, AA, M, Y;
        double JD1 = data + 0.5+tz/24;
        int Z = (int)(Math.floor(JD1));
        double F = JD1 - Z;
        if (Z<2299161){A=Z;}
        else { AA = (int)(Math.floor((Z-1867216.25)/36524.25));A =(int) (Z + 1 + AA - Math.floor(AA/4));};
        int B = A+1524;
        int C = (int)(Math.floor((B-122.1)/365.25));
        int D = (int)(Math.floor(365.25*C));
        int E = (int)(Math.floor((B-D)/30.6001));
        int tgl = (int)(B-D-Math.floor(30.6001*E)+F);
        if (E>13){M=E-13;}
        else {M = E - 1;};
        if (M<3){Y = C - 4715;}
        else {Y = C - 4716;};
        double JdTs1=data;

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

        int hari=(int)((JdTs1+1.5+tz/24)%7+1);
        int pasr=(int)((JdTs1+1.5+tz/24)%5+1);
        String NmHr=Hari[hari];
        String NmPs=Pasaran[pasr];
//String TanggalA=","+Hisab.JdtoM(JdTs1);
        String Harpas=" "+NmHr+" "+NmPs;

        String[] Bulan = new String[]{"","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"};
        return Harpas;
    }

    public static String JdtoTanggal(double data,double tz){
        int A, AA, M, Y;
        double JD1 = data + 0.5+tz/24;
        int Z = (int)(Math.floor(JD1));
        double F = JD1 - Z;
        if (Z<2299161){A=Z;}
        else { AA = (int)(Math.floor((Z-1867216.25)/36524.25));A =(int) (Z + 1 + AA - Math.floor(AA/4));};
        int B = A+1524;
        int C = (int)(Math.floor((B-122.1)/365.25));
        int D = (int)(Math.floor(365.25*C));
        int E = (int)(Math.floor((B-D)/30.6001));
        int tgl = (int)(B-D-Math.floor(30.6001*E)+F);
        if (E>13){M=E-13;}
        else {M = E - 1;};
        if (M<3){Y = C - 4715;}
        else {Y = C - 4716;};

        // String[] Bulan = new String[]{"","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"};
        String Bulan;
        if(M==1){Bulan="Januari";}
        else if(M==2){Bulan="Pebruari";}
        else if(M==3){Bulan="Maret";}
        else if(M==4){Bulan="April";}
        else if(M==5){Bulan="Mei";}
        else if(M==6){Bulan="Juni";}
        else if(M==7){Bulan="Juli";}
        else if(M==8){Bulan="Agustus";}
        else if(M==9){Bulan="September";}
        else if(M==10){Bulan="Oktober";}
        else if(M==11){Bulan="November";}
        else if(M==12){Bulan="Desember";}

        else {Bulan="Januari";}
        return tgl+" "+Bulan+" "+Y+" M";
    }

    public static double angkablnm(String M){

        // String[] Bulan = new String[]{"","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"};
        double Bulan;
        switch (M) {
            case "Januari":
                return 1;
            case "Februari":
                return 2;
            case "Maret":
                return 3;
            case "April":
                return 4;
            case "Mei":
                return 5;
            case "Juni":
                return 6;
            case "Juli":
                return 7;
            case "Agustus":
                return 8;
            case "September":
                return 9;
            case "Oktober":
                return 10;
            case "November":
                return 11;
            case "Desember":
                return 12;
            default:
                return 0;

        }
    }

    public static double angkahijri(String i) {
        switch (i) {
            case "Muharam":
                return 1;
            case "Shafar":
                return 2;
            case "R.Awal":
                return 3;
            case "R.Tsani":
                return 4;
            case "J.Ula":
                return 5;
            case "J.Tsani":
                return 6;
            case "Rajab":
                return 7;
            case "Sya'ban":
                return 8;
            case "Ramadlan":
                return 9;
            case "Syawal":
                return 10;
            case "Dzulqa'dah":
                return 11;
            case "Dzulhijjah":
                return 12;
            default:
                return 0;
        }
    }

    public static double[] azm2(double lt,double bt,double dec,double eqt,double tz,double jam) {
        double G67 = eqt+(bt-tz*15)/15;
        double ST =jam+G67 % 24;
        double HA =(ST-12)*15;
        double ga=180 - 15 * (jam + eqt);
        double ha= dec -ga;
        double WH = jam+eqt-((tz*15)-bt)/15;
        double T=(WH-12)*15;
        double h,z,Az,Azb;
        h=Deg(Math.asin(SinA(lt) * SinA(dec) + CosA(lt) * CosA(dec) * CosA(T)));
        z=Deg(Math.atan(-SinA(lt) / TanA(T) + CosA(lt) * TanA(dec) / SinA(T)));
        if(jam<12){Az=z+90;}else{Az=z+270;}
        Az=ModFDiv(Az,360);
        Azb=ModFDiv(Az+180,360);

        double sz,alt,by;
        sz=Deg(Asn(SinA(lt) * SinA(dec) + CosA(lt) * CosA(dec) * CosA(HA)));
//        sz =Math.toDegrees(Math.acos(Math.sin(Math.toRadians(lt)) * Math.sin(Math.toRadians(dec)) + Math.cos(Math.toRadians(lt)) * Math.cos(Math.toRadians(dec)) * Math.cos(Math.toRadians(HA))));
        alt =90-sz;
        double azmt = Math.signum (HA) * Math.toDegrees (Math.acos ((Math.cos (Math.toRadians (sz)) * Math.sin (Math.toRadians (lt)) - Math.sin (Math.toRadians (dec))) / (Math.sin (Math.toRadians (sz)) * Math.cos (Math.toRadians (tz)))));
        azmt +=180 % 360;
        if (azmt >=180) {
            by = azmt-180;
        } else
        { by = azmt + 180;}
        return new double[]{0,h,90-h,Az,Azb};

    }

    public static double [] JdToTgl (double JD) {
        double Hy, K, T, Jde, E;
        double M, N, F, G, h, a,Y;
        int A,AA;
        double JD1 = JD;
        int Z = (int)(Math.floor(JD1));
        F = JD1 - Z;
        if (Z<2299161){A=Z;}
        else { AA = (int)(Math.floor((Z-1867216.25)/36524.25));A =(int) (Z + 1 + AA - Math.floor(AA/4));};
        int B = A+1524;
        int C = (int)(Math.floor((B-122.1)/365.25));
        int D = (int)(Math.floor(365.25*C));
        int e = (int)(Math.floor((B-D)/30.6001));
        double tgl = (int)(B-D-Math.floor(30.6001*e)+0);
        if (e>13){M=e-13;}
        else {M = e - 1;};
        if (M<3){Y = C - 4715;}
        else {Y = C - 4716;};
        double hari=ModFDiv(JD+16,7);
        double pasr=ModFDiv(JD+16,5);
        return new double[]{0,tgl,M,Y,hari,pasr};
    }

    public static String NmPs(int Data){
        int M=Data;
        String Hr;
        if(M==0){Hr="Kliwon";}
        else if(M==1){Hr="Legi";}
        else if(M==2){Hr="Pahing";}
        else if(M==3){Hr="Pon";}
        else if(M==4){Hr="Wage";}
        else if(M==5){Hr="Kliwon";}
        else if(M==6){Hr="Legi";}
        else {Hr="Kliwon";}
        return Hr;
    }

    public static String NmHr2(int Data){
        int M=Data;
        String Hr;
        if(M==0){Hr="Sabtu";}
        else if(M==1){Hr="Ahad";}
        else if(M==2){Hr="Senin";}
        else if(M==3){Hr="Selasa";}
        else if(M==4){Hr="Rabu";}
        else if(M==5){Hr="Kamis";}
        else if(M==6){Hr="Jum'at";}
        else if(M==7){Hr="Sabtu";}
        else if(M==8){Hr="Ahad";}
        else {Hr="Sabtu";}
        return Hr;
    }

    public static String JdtoHari(double data,double tz){
        int A, AA, M, Y;
        double JD1 = data ;
        int Z = (int)(Math.floor(JD1));
        double F = JD1 - Z;
        if (Z<2299161){A=Z;}
        else { AA = (int)(Math.floor((Z-1867216.25)/36524.25));
            A =(int) (Z + 1 + AA - Math.floor(AA/4));};
        int B = A+1524;
        int C = (int)(Math.floor((B-122.1)/365.25));
        int D = (int)(Math.floor(365.25*C));
        int E = (int)(Math.floor((B-D)/30.6001));
        int tgl = (int)(B-D-Math.floor(30.6001*E)+F);
        if (E>13){M=E-13;}
        else {M = E - 1;};
        if (M<3){Y = C - 4715;}
        else {Y = C - 4716;};
        double JdTs1=data;

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

        int hari=(int)((JdTs1+1.5+tz/24)%7+1);
        int pasr=(int)((JdTs1+1.5+tz/24)%5+1);
        String NmHr=Hari[hari];
        String NmPs=Pasaran[pasr];
        String Harpas=""+NmHr+" "+NmPs;
        return Harpas;
    }

}
