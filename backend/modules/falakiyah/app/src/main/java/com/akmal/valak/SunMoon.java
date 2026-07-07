package com.akmal.valak;

import java.text.DecimalFormat;
import static com.akmal.valak.fungsi.*;

public class SunMoon {

    public static double NutationInLongitude( double JD ){
//  Deklarasi Variabel dan Tipe Variabel

        double T;
        double D;
        double M;
        double MMM ;
        double F;
        double Omg;
        double DltPsi  ;
//  Proses Perhitungan
        T = (JD - 2451545) / 36525;
        D = 297.85036 + 445267.11148 * T - 0.0019142 * Math.pow(T,2) + Math.pow(T,3) / 189474;
        M = 357.52772 + 35999.05034 * T - 0.0001603 * Math.pow(T,2) - Math.pow(T,3) / 300000;
        MMM = 134.96298 + 477198.867398 * T + 0.0086972 * Math.pow(T,2) + Math.pow(T,3) / 56250;
        F = 93.27191 + 483202.017538 * T - 0.0036825 * Math.pow(T,2) + Math.pow(T,3) / 327270;
        Omg = 125.04452 - 1934.136261 * T + 0.0020708 * Math.pow(T,2) + Math.pow(T,3) / 450000;
        D = Rad(ModFDiv(D, 360));
        M = Rad(ModFDiv(M, 360));
        MMM = Rad(ModFDiv(MMM, 360));
        F = Rad(ModFDiv(F, 360));
        Omg = Rad(ModFDiv(Omg, 360));

        DltPsi = 0;
        DltPsi = DltPsi + (-171996 + -174.2 * T) * Sin(0 * D + 0 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-13187 + -1.6 * T) * Sin(-2 * D + 0 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-2274 + -0.2 * T) * Sin(0 * D + 0 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (2062 + 0.2 * T) * Sin(0 * D + 0 * M + 0 * MMM + 0 * F + 2 * Omg);
        DltPsi = DltPsi + (1426 + -3.4 * T) * Sin(0 * D + 1 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (712 + 0.1 * T) * Sin(0 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-517 + 1.2 * T) * Sin(-2 * D + 1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-386 + -0.4 * T) * Sin(0 * D + 0 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (-301 + 0 * T) * Sin(0 * D + 0 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (217 + -0.5 * T) * Sin(-2 * D + -1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-158 + 0 * T) * Sin(-2 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (129 + 0.1 * T) * Sin(-2 * D + 0 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (123 + 0 * T) * Sin(0 * D + 0 * M + -1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (63 + 0 * T) * Sin(2 * D + 0 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (63 + 0.1 * T) * Sin(0 * D + 0 * M + 1 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-59 + 0 * T) * Sin(2 * D + 0 * M + -1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-58 + -0.1 * T) * Sin(0 * D + 0 * M + -1 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-51 + 0 * T) * Sin(0 * D + 0 * M + 1 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (48 + 0 * T) * Sin(-2 * D + 0 * M + 2 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (46 + 0 * T) * Sin(0 * D + 0 * M + -2 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (-38 + 0 * T) * Sin(2 * D + 0 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-31 + 0 * T) * Sin(0 * D + 0 * M + 2 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (29 + 0 * T) * Sin(0 * D + 0 * M + 2 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (29 + 0 * T) * Sin(-2 * D + 0 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (26 + 0 * T) * Sin(0 * D + 0 * M + 0 * MMM + 2 * F + 0 * Omg);
        DltPsi = DltPsi + (-22 + 0 * T) * Sin(-2 * D + 0 * M + 0 * MMM + 2 * F + 0 * Omg);
        DltPsi = DltPsi + (21 + 0 * T) * Sin(0 * D + 0 * M + -1 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (17 + -0.1 * T) * Sin(0 * D + 2 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (16 + 0 * T) * Sin(2 * D + 0 * M + -1 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-16 + 0.1 * T) * Sin(-2 * D + 2 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-15 + 0 * T) * Sin(0 * D + 1 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-13 + 0 * T) * Sin(-2 * D + 0 * M + 1 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-12 + 0 * T) * Sin(0 * D + -1 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (11 + 0 * T) * Sin(0 * D + 0 * M + 2 * MMM + -2 * F + 0 * Omg);
        DltPsi = DltPsi + (-10 + 0 * T) * Sin(2 * D + 0 * M + -1 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (-8 + 0 * T) * Sin(2 * D + 0 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (7 + 0 * T) * Sin(0 * D + 1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-7 + 0 * T) * Sin(-2 * D + 1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-7 + 0 * T) * Sin(0 * D + -1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-7 + 0 * T) * Sin(2 * D + 0 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (6 + 0 * T) * Sin(2 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (6 + 0 * T) * Sin(-2 * D + 0 * M + 2 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (6 + 0 * T) * Sin(-2 * D + 0 * M + 1 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (-6 + 0 * T) * Sin(2 * D + 0 * M + -2 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-6 + 0 * T) * Sin(2 * D + 0 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (5 + 0 * T) * Sin(0 * D + -1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-5 + 0 * T) * Sin(-2 * D + -1 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (-5 + 0 * T) * Sin(-2 * D + 0 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (-5 + 0 * T) * Sin(0 * D + 0 * M + 2 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (4 + 0 * T) * Sin(-2 * D + 0 * M + 2 * MMM + 0 * F + 1 * Omg);
        DltPsi = DltPsi + (4 + 0 * T) * Sin(-2 * D + 1 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltPsi = DltPsi + (4 + 0 * T) * Sin(0 * D + 0 * M + 1 * MMM + -2 * F + 0 * Omg);
        DltPsi = DltPsi + (-4 + 0 * T) * Sin(-1 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-4 + 0 * T) * Sin(-2 * D + 1 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-4 + 0 * T) * Sin(1 * D + 0 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (3 + 0 * T) * Sin(0 * D + 0 * M + 1 * MMM + 2 * F + 0 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(0 * D + 0 * M + -2 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(-1 * D + -1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(0 * D + 1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(0 * D + -1 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(2 * D + -1 * M + -1 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(0 * D + 0 * M + 3 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi + (-3 + 0 * T) * Sin(2 * D + -1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltPsi = DltPsi / 36000000;
        return DltPsi;
    }
    public static double NutationInObliquity( double JD ){
//  Deklarasi Variabel dan Tipe Variabel

        double T ;
        double D ;
        double M ;
        double MMM;
        double F;
        double Omg ;
        double DltEps;
//  Proses Perhitungan

        T = (JD - 2451545) / 36525;
        D = 297.85036 + 445267.11148 * T - 0.0019142 * Math.pow(T,2) + Math.pow(T,3) / 189474;
        M = 357.52772 + 35999.05034 * T - 0.0001603 * Math.pow(T,2) - Math.pow(T,3) / 300000;
        MMM = 134.96298 + 477198.867398 * T + 0.0086972 * Math.pow(T,2) + Math.pow(T,3) / 56250;
        F = 93.27191 + 483202.017538 * T - 0.0036825 * Math.pow(T,2) + Math.pow(T,3) / 327270;
        Omg = 125.04452 - 1934.136261 * T + 0.0020708 * Math.pow(T,2) + Math.pow(T,3) / 450000;
        D = Rad(ModFDiv(D, 360));
        M = Rad(ModFDiv(M, 360));
        MMM = Rad(ModFDiv(MMM, 360));
        F = Rad(ModFDiv(F, 360));
        Omg = Rad(ModFDiv(Omg, 360));

        DltEps = 0;
        DltEps = DltEps + (92025 + 8.9 * T) * Cos(0 * D + 0 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (5736 + -3.1 * T) * Cos(-2 * D + 0 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (977 + -0.5 * T) * Cos(0 * D + 0 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (-895 + 0.5 * T) * Cos(0 * D + 0 * M + 0 * MMM + 0 * F + 2 * Omg);
        DltEps = DltEps + (54 + -0.1 * T) * Cos(0 * D + 1 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-7 + 0 * T) * Cos(0 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (224 + -0.6 * T) * Cos(-2 * D + 1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (200 + 0 * T) * Cos(0 * D + 0 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (129 + -0.1 * T) * Cos(0 * D + 0 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (-95 + 0.3 * T) * Cos(-2 * D + -1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-70 + 0 * T) * Cos(-2 * D + 0 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (-53 + 0 * T) * Cos(0 * D + 0 * M + -1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(2 * D + 0 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-33 + 0 * T) * Cos(0 * D + 0 * M + 1 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (26 + 0 * T) * Cos(2 * D + 0 * M + -1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (32 + 0 * T) * Cos(0 * D + 0 * M + -1 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (27 + 0 * T) * Cos(0 * D + 0 * M + 1 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 0 * M + 2 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-24 + 0 * T) * Cos(0 * D + 0 * M + -2 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (16 + 0 * T) * Cos(2 * D + 0 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (13 + 0 * T) * Cos(0 * D + 0 * M + 2 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + 2 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-12 + 0 * T) * Cos(-2 * D + 0 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + 0 * MMM + 2 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 0 * M + 0 * MMM + 2 * F + 0 * Omg);
        DltEps = DltEps + (-10 + 0 * T) * Cos(0 * D + 0 * M + -1 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 2 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-8 + 0 * T) * Cos(2 * D + 0 * M + -1 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (7 + 0 * T) * Cos(-2 * D + 2 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (9 + 0 * T) * Cos(0 * D + 1 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (7 + 0 * T) * Cos(-2 * D + 0 * M + 1 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (6 + 0 * T) * Cos(0 * D + -1 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + 2 * MMM + -2 * F + 0 * Omg);
        DltEps = DltEps + (5 + 0 * T) * Cos(2 * D + 0 * M + -1 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(2 * D + 0 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (-3 + 0 * T) * Cos(0 * D + 1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(0 * D + -1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(2 * D + 0 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(2 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (-3 + 0 * T) * Cos(-2 * D + 0 * M + 2 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (-3 + 0 * T) * Cos(-2 * D + 0 * M + 1 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(2 * D + 0 * M + -2 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(2 * D + 0 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + -1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(-2 * D + -1 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(-2 * D + 0 * M + 0 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (3 + 0 * T) * Cos(0 * D + 0 * M + 2 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 0 * M + 2 * MMM + 0 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 1 * M + 0 * MMM + 2 * F + 1 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + 1 * MMM + -2 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-1 * D + 0 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-2 * D + 1 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(1 * D + 0 * M + 0 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + 1 * MMM + 2 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + -2 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(-1 * D + -1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 1 * M + 1 * MMM + 0 * F + 0 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + -1 * M + 1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(2 * D + -1 * M + -1 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(0 * D + 0 * M + 3 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps + (0 + 0 * T) * Cos(2 * D + -1 * M + 0 * MMM + 2 * F + 2 * Omg);
        DltEps = DltEps / 36000000;
        return DltEps;
    }
    public static double MeanObliquityOfEcliptic(double JD ){
//  Deklarasi Variabel dan Tipe Variabel

        double T ;
        double U ;
        double Eps0 ;
//  Proses Perhitungan
        T = (JD - 2451545) / 36525;
        U = T / 100;
        Eps0 = (23 + 26 / 60d + 21.448 / 3600) + (-4680.93 * U - 1.55 * Math.pow(U,2)+ 1999.25 * Math.pow(U,3)
                - 51.38 * Math.pow(U,4)
                - 249.67 * Math.pow(U,5)
                - 39.05 * Math.pow(U,6)
                + 7.12 * Math.pow(U,7)
                + 27.87 * Math.pow(U,8)
                + 5.79 * Math.pow(U,9)
                + 2.45 * Math.pow(U,10)) / 3600;
        return Eps0;
    }
    public static double ObliquityOfEcliptic(double JD ){
//  Deklarasi Variabel dan Tipe Variabel

        double Eps0 ;
        double DltEps ;
        double Eps;
//  Proses Perhitungan
        Eps0 = MeanObliquityOfEcliptic(JD);
        DltEps = NutationInObliquity(JD);
        Eps = Eps0 + DltEps;
        return Eps;
    }
    public static double EarthHeliocentricLongitude( double JD ){
//  Deklarasi Variabel dan Tipe Variabel

        double Tau;
        double L0;
        double L1 ;
        double L2;
        double L3 ;
        double L4 ;
        double L5 ;
        double L;
        Tau = (JD - 2451545) / 365250;
        L0 = 0;
        L0 = L0 + 175347046d * Cos(0 + 0 * Tau);
        L0 = L0 + 3341656 * Cos(4.6692568 + 6283.07585 * Tau);
        L0 = L0 + 34894 * Cos(4.6261 + 12566.1517 * Tau);
        L0 = L0 + 3497 * Cos(2.7441 + 5753.3849 * Tau);
        L0 = L0 + 3418 * Cos(2.8289 + 3.5231 * Tau);
        L0 = L0 + 3136 * Cos(3.6277 + 77713.7715 * Tau);
        L0 = L0 + 2676 * Cos(4.4181 + 7860.4194 * Tau);
        L0 = L0 + 2343 * Cos(6.1352 + 3930.2097 * Tau);
        L0 = L0 + 1324 * Cos(0.7425 + 11506.7698 * Tau);
        L0 = L0 + 1273 * Cos(2.0371 + 529.691 * Tau);
        L0 = L0 + 1199 * Cos(1.1096 + 1577.3435 * Tau);
        L0 = L0 + 990 * Cos(5.233 + 5884.927 * Tau);
        L0 = L0 + 902 * Cos(2.045 + 26.298 * Tau);
        L0 = L0 + 857 * Cos(3.508 + 398.149 * Tau);
        L0 = L0 + 780 * Cos(1.179 + 5223.694 * Tau);
        L0 = L0 + 753 * Cos(2.533 + 5507.553 * Tau);
        L0 = L0 + 505 * Cos(4.583 + 18849.228 * Tau);
        L0 = L0 + 492 * Cos(4.205 + 775.523 * Tau);
        L0 = L0 + 357 * Cos(2.92 + 0.067 * Tau);
        L0 = L0 + 317 * Cos(5.849 + 11790.629 * Tau);
        L0 = L0 + 284 * Cos(1.899 + 796.298 * Tau);
        L0 = L0 + 271 * Cos(0.315 + 10977.079 * Tau);
        L0 = L0 + 243 * Cos(0.345 + 5486.778 * Tau);
        L0 = L0 + 206 * Cos(4.806 + 2544.314 * Tau);
        L0 = L0 + 205 * Cos(1.869 + 5573.143 * Tau);
        L0 = L0 + 202 * Cos(2.458 + 6069.777 * Tau);
        L0 = L0 + 156 * Cos(0.833 + 213.299 * Tau);
        L0 = L0 + 132 * Cos(3.411 + 2942.463 * Tau);
        L0 = L0 + 126 * Cos(1.083 + 20.775 * Tau);
        L0 = L0 + 115 * Cos(0.645 + 0.98 * Tau);
        L0 = L0 + 103 * Cos(0.636 + 4694.003 * Tau);
        L0 = L0 + 102 * Cos(0.976 + 15720.839 * Tau);
        L0 = L0 + 102 * Cos(4.267 + 7.114 * Tau);
        L0 = L0 + 99 * Cos(6.21 + 2146.17 * Tau);
        L0 = L0 + 98 * Cos(0.68 + 155.42 * Tau);
        L0 = L0 + 86 * Cos(5.98 + 161000.69 * Tau);
        L0 = L0 + 85 * Cos(1.3 + 6275.96 * Tau);
        L0 = L0 + 85 * Cos(3.67 + 71430.7 * Tau);
        L0 = L0 + 80 * Cos(1.81 + 17260.15 * Tau);
        L0 = L0 + 79 * Cos(3.04 + 12036.46 * Tau);
        L0 = L0 + 75 * Cos(1.76 + 5088.63 * Tau);
        L0 = L0 + 74 * Cos(3.5 + 3154.69 * Tau);
        L0 = L0 + 74 * Cos(4.68 + 801.82 * Tau);
        L0 = L0 + 70 * Cos(0.83 + 9437.76 * Tau);
        L0 = L0 + 62 * Cos(3.98 + 8827.39 * Tau);
        L0 = L0 + 61 * Cos(1.82 + 7084.9 * Tau);
        L0 = L0 + 57 * Cos(2.78 + 6286.6 * Tau);
        L0 = L0 + 56 * Cos(4.39 + 14143.5 * Tau);
        L0 = L0 + 56 * Cos(3.47 + 6279.55 * Tau);
        L0 = L0 + 52 * Cos(0.19 + 12139.55 * Tau);
        L0 = L0 + 52 * Cos(1.33 + 1748.02 * Tau);
        L0 = L0 + 51 * Cos(0.28 + 5856.48 * Tau);
        L0 = L0 + 49 * Cos(0.49 + 1194.45 * Tau);
        L0 = L0 + 41 * Cos(5.37 + 8429.24 * Tau);
        L0 = L0 + 41 * Cos(2.4 + 19651.05 * Tau);
        L0 = L0 + 39 * Cos(6.17 + 10447.39 * Tau);
        L0 = L0 + 37 * Cos(6.04 + 10213.29 * Tau);
        L0 = L0 + 37 * Cos(2.57 + 1059.38 * Tau);
        L0 = L0 + 36 * Cos(1.71 + 2352.87 * Tau);
        L0 = L0 + 36 * Cos(1.78 + 6812.77 * Tau);
        L0 = L0 + 33 * Cos(0.59 + 17789.85 * Tau);
        L0 = L0 + 30 * Cos(0.44 + 83996.85 * Tau);
        L0 = L0 + 30 * Cos(2.74 + 1349.87 * Tau);
        L0 = L0 + 25 * Cos(3.16 + 4690.48 * Tau);

        L1 = 0;
        L1 = L1 + 628331966747d * Cos(0 + 0 * Tau);
        L1 = L1 + 206059 * Cos(2.678235 + 6283.07585 * Tau);
        L1 = L1 + 4303 * Cos(2.6351 + 12566.1517 * Tau);
        L1 = L1 + 425 * Cos(1.59 + 3.523 * Tau);
        L1 = L1 + 119 * Cos(5.796 + 26.298 * Tau);
        L1 = L1 + 109 * Cos(2.966 + 1577.344 * Tau);
        L1 = L1 + 93 * Cos(2.59 + 18849.23 * Tau);
        L1 = L1 + 72 * Cos(1.14 + 529.69 * Tau);
        L1 = L1 + 68 * Cos(1.87 + 398.15 * Tau);
        L1 = L1 + 67 * Cos(4.41 + 5507.55 * Tau);
        L1 = L1 + 59 * Cos(2.89 + 5223.69 * Tau);
        L1 = L1 + 56 * Cos(2.17 + 155.42 * Tau);
        L1 = L1 + 45 * Cos(0.4 + 796.3 * Tau);
        L1 = L1 + 36 * Cos(0.47 + 775.52 * Tau);
        L1 = L1 + 29 * Cos(2.65 + 7.11 * Tau);
        L1 = L1 + 21 * Cos(5.34 + 0.98 * Tau);
        L1 = L1 + 19 * Cos(1.85 + 5486.78 * Tau);
        L1 = L1 + 19 * Cos(4.97 + 213.3 * Tau);
        L1 = L1 + 17 * Cos(2.99 + 6275.96 * Tau);
        L1 = L1 + 16 * Cos(0.03 + 2544.31 * Tau);
        L1 = L1 + 16 * Cos(1.43 + 2146.17 * Tau);
        L1 = L1 + 15 * Cos(1.21 + 10977.08 * Tau);
        L1 = L1 + 12 * Cos(2.83 + 1748.02 * Tau);
        L1 = L1 + 12 * Cos(3.26 + 5088.63 * Tau);
        L1 = L1 + 12 * Cos(5.27 + 1194.45 * Tau);
        L1 = L1 + 12 * Cos(2.08 + 4694 * Tau);
        L1 = L1 + 11 * Cos(0.77 + 553.57 * Tau);
        L1 = L1 + 10 * Cos(1.3 + 6286.6 * Tau);
        L1 = L1 + 10 * Cos(4.24 + 1349.87 * Tau);
        L1 = L1 + 9 * Cos(2.7 + 242.73 * Tau);
        L1 = L1 + 9 * Cos(5.64 + 951.72 * Tau);
        L1 = L1 + 8 * Cos(5.3 + 2352.87 * Tau);
        L1 = L1 + 6 * Cos(2.65 + 9437.76 * Tau);
        L1 = L1 + 6 * Cos(4.67 + 4690.48 * Tau);

        L2 = 0;
        L2 = L2 + 52919 * Cos(0 + 0 * Tau);
        L2 = L2 + 8720 * Cos(1.0721 + 6283.0758 * Tau);
        L2 = L2 + 309 * Cos(0.867 + 12566.152 * Tau);
        L2 = L2 + 27 * Cos(0.05 + 3.52 * Tau);
        L2 = L2 + 16 * Cos(5.19 + 26.3 * Tau);
        L2 = L2 + 16 * Cos(3.68 + 155.42 * Tau);
        L2 = L2 + 10 * Cos(0.76 + 18849.23 * Tau);
        L2 = L2 + 9 * Cos(2.06 + 77713.77 * Tau);
        L2 = L2 + 7 * Cos(0.83 + 775.52 * Tau);
        L2 = L2 + 5 * Cos(4.66 + 1577.34 * Tau);
        L2 = L2 + 4 * Cos(1.03 + 7.11 * Tau);
        L2 = L2 + 4 * Cos(3.44 + 5573.14 * Tau);
        L2 = L2 + 3 * Cos(5.14 + 796.3 * Tau);
        L2 = L2 + 3 * Cos(6.05 + 5507.55 * Tau);
        L2 = L2 + 3 * Cos(1.19 + 242.73 * Tau);
        L2 = L2 + 3 * Cos(6.12 + 529.69 * Tau);
        L2 = L2 + 3 * Cos(0.31 + 398.15 * Tau);
        L2 = L2 + 3 * Cos(2.28 + 553.57 * Tau);
        L2 = L2 + 2 * Cos(4.38 + 5223.69 * Tau);
        L2 = L2 + 2 * Cos(3.75 + 0.98 * Tau);

        L3 = 0;
        L3 = L3 + 289 * Cos(5.844 + 6283.076 * Tau);
        L3 = L3 + 35 * Cos(0 + 0 * Tau);
        L3 = L3 + 17 * Cos(5.49 + 12566.15 * Tau);
        L3 = L3 + 3 * Cos(5.2 + 155.42 * Tau);
        L3 = L3 + 1 * Cos(4.72 + 3.52 * Tau);
        L3 = L3 + 1 * Cos(5.3 + 18849.23 * Tau);
        L3 = L3 + 1 * Cos(5.97 + 242.73 * Tau);

        L4 = 0;
        L4 = L4 + 114 * Cos(3.142 + 0 * Tau);
        L4 = L4 + 8 * Cos(4.13 + 6283.08 * Tau);
        L4 = L4 + 1 * Cos(3.84 + 12566.15 * Tau);

        L5 = 0;
        L5 = L5 + 1 * Cos(3.14 + 0 * Tau);

        L = (L0 + L1 * Tau + L2 * Math.pow(Tau,2) + L3 * Math.pow(Tau,3) + L4 * Math.pow(Tau,4) + L5 * Math.pow(Tau,5)) / 100000000;
        L = Deg(L);
        L = ModFDiv(L, 360);
        return L;
    }
    public static double EarthHeliocentricLatitude(double JD ) {
//  Deklarasi Variabel dan Tipe Variabel

        double Tau;
        double B0;
        double B1;
        double B;
//  Proses Perhitungan

        Tau = (JD - 2451545) / 365250;

        B0 = 0;
        B0 = B0 + 280 * Cos(3.199 + 84334.662 * Tau);
        B0 = B0 + 102 * Cos(5.422 + 5507.553 * Tau);
        B0 = B0 + 80 * Cos(3.88 + 5223.69 * Tau);
        B0 = B0 + 44 * Cos(3.7 + 2352.87 * Tau);
        B0 = B0 + 32 * Cos(4 + 1577.34 * Tau);

        B1 = 0;
        B1 = B1 + 9 * Cos(3.9 + 5507.55 * Tau);
        B1 = B1 + 6 * Cos(1.73 + 5223.69 * Tau);

        B = (B0 + B1 * Tau) / 100000000;
        B = Deg(B);
        return B;
    }
    public static double EarthRadiusVector( double JD ) {
//  Deklarasi Variabel dan Tipe Variabel

        double Tau;
        double R0;
        double r1;
        double r2;
        double R3;
        double R4;
        double r;
//  Proses Perhitungan

        Tau = (JD - 2451545) / 365250;

        R0 = 0;
        R0 = R0 + 100013989 * Cos(0 + 0 * Tau);
        R0 = R0 + 1670700 * Cos(3.0984635 + 6283.07585 * Tau);
        R0 = R0 + 13956 * Cos(3.05525 + 12566.1517 * Tau);
        R0 = R0 + 3084 * Cos(5.1985 + 77713.7715 * Tau);
        R0 = R0 + 1628 * Cos(1.1739 + 5753.3849 * Tau);
        R0 = R0 + 1576 * Cos(2.8469 + 7860.4194 * Tau);
        R0 = R0 + 925 * Cos(5.453 + 11506.77 * Tau);
        R0 = R0 + 542 * Cos(4.564 + 3930.21 * Tau);
        R0 = R0 + 472 * Cos(3.661 + 5884.927 * Tau);
        R0 = R0 + 346 * Cos(0.964 + 5507.553 * Tau);
        R0 = R0 + 329 * Cos(5.9 + 5223.694 * Tau);
        R0 = R0 + 307 * Cos(0.299 + 5573.143 * Tau);
        R0 = R0 + 243 * Cos(4.273 + 11790.629 * Tau);
        R0 = R0 + 212 * Cos(5.847 + 1577.344 * Tau);
        R0 = R0 + 186 * Cos(5.022 + 10977.079 * Tau);
        R0 = R0 + 175 * Cos(3.012 + 18849.228 * Tau);
        R0 = R0 + 110 * Cos(5.055 + 5486.778 * Tau);
        R0 = R0 + 98 * Cos(0.89 + 6069.78 * Tau);
        R0 = R0 + 86 * Cos(5.69 + 15720.84 * Tau);
        R0 = R0 + 86 * Cos(1.27 + 161000.69 * Tau);
        R0 = R0 + 65 * Cos(0.27 + 17260.15 * Tau);
        R0 = R0 + 63 * Cos(0.92 + 529.69 * Tau);
        R0 = R0 + 57 * Cos(2.01 + 83996.85 * Tau);
        R0 = R0 + 56 * Cos(5.24 + 71430.7 * Tau);
        R0 = R0 + 49 * Cos(3.25 + 2544.31 * Tau);
        R0 = R0 + 47 * Cos(2.58 + 775.52 * Tau);
        R0 = R0 + 45 * Cos(5.54 + 9437.76 * Tau);
        R0 = R0 + 43 * Cos(6.01 + 6275.96 * Tau);
        R0 = R0 + 39 * Cos(5.36 + 4694 * Tau);
        R0 = R0 + 38 * Cos(2.39 + 8827.39 * Tau);
        R0 = R0 + 37 * Cos(0.83 + 19651.05 * Tau);
        R0 = R0 + 37 * Cos(4.9 + 12139.55 * Tau);
        R0 = R0 + 36 * Cos(1.67 + 12036.46 * Tau);
        R0 = R0 + 35 * Cos(1.84 + 2942.46 * Tau);
        R0 = R0 + 33 * Cos(0.24 + 7084.9 * Tau);
        R0 = R0 + 32 * Cos(0.18 + 5088.63 * Tau);
        R0 = R0 + 32 * Cos(1.78 + 398.15 * Tau);
        R0 = R0 + 28 * Cos(1.21 + 6286.6 * Tau);
        R0 = R0 + 28 * Cos(1.9 + 6279.55 * Tau);
        R0 = R0 + 26 * Cos(4.59 + 10447.39 * Tau);

        r1 = 0;
        r1 = r1 + 103019 * Cos(1.10749 + 6283.07585 * Tau);
        r1 = r1 + 1721 * Cos(1.0644 + 12566.1517 * Tau);
        r1 = r1 + 702 * Cos(3.142 + 0 * Tau);
        r1 = r1 + 32 * Cos(1.02 + 18849.23 * Tau);
        r1 = r1 + 31 * Cos(2.84 + 5507.55 * Tau);
        r1 = r1 + 25 * Cos(1.32 + 5223.69 * Tau);
        r1 = r1 + 18 * Cos(1.42 + 1577.34 * Tau);
        r1 = r1 + 10 * Cos(5.91 + 10977.08 * Tau);
        r1 = r1 + 9 * Cos(1.42 + 6275.96 * Tau);
        r1 = r1 + 9 * Cos(0.27 + 5486.78 * Tau);

        r2 = 0;
        r2 = r2 + 4359 * Cos(5.7846 + 6283.0758 * Tau);
        r2 = r2 + 124 * Cos(5.579 + 12566.152 * Tau);
        r2 = r2 + 12 * Cos(3.14 + 0 * Tau);
        r2 = r2 + 9 * Cos(3.63 + 77713.77 * Tau);
        r2 = r2 + 6 * Cos(1.87 + 5573.14 * Tau);
        r2 = r2 + 3 * Cos(5.47 + 18849.23 * Tau);

        R3 = 0;
        R3 = R3 + 145 * Cos(4.273 + 6283.076 * Tau);
        R3 = R3 + 7 * Cos(3.92 + 12566.15 * Tau);

        R4 = 0;
        R4 = R4 + 4 * Cos(2.56 + 6283.08 * Tau);

        r = (R0 + r1 * Tau + r2 * Math.pow(Tau,2) + R3 * Math.pow(Tau,3) + R4 * Math.pow(Tau,4)) / 100000000;
        return r;
    }
    public static double SunGeocentricLongitude(double JD) {
//  Deklarasi Variabel dan Tipe Variabel

        double L;
        double B;
        double Theta;
        double Beta;
        double T;
        double Lameda;
        double DeltaTheta;
        double ThetaFK5;
        double DeltaPsi;
        double Abberration;
        double Lambda;
//  Proses Perhitungan
        L = EarthHeliocentricLongitude(JD);
        B = EarthHeliocentricLatitude(JD);
        Theta = L + 180;
        Theta = ModFDiv(Theta, 360);
        Beta = -B;
        T = (JD - 2451545) / 36525;
        Lameda =Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
        DeltaTheta = (-0.09033 + 0.03916 * (Cos(Rad(Lameda)) + Sin(Rad(Lameda))) * Tan(Rad(Beta))) / 3600;
        ThetaFK5 = Theta + DeltaTheta;
        DeltaPsi = NutationInLongitude(JD);
        Abberration = (-20.4898 / EarthRadiusVector(JD)) / 3600;
        Lambda = ThetaFK5 + DeltaPsi + Abberration;
        Lambda = ModFDiv(Lambda, 360);
        return Lambda;
    }
    public static double SunEclipticGeocentricLongitude(double JD) {
//  Deklarasi Variabel dan Tipe Variabel

        double L;
        double B;
        double Theta;
        double Beta;
        double T;
        double Lameda;
        double DeltaTheta;
        double ThetaFK5;
        double DeltaPsi;
        double Abberration;
        double Lambda;
//  Proses Perhitungan
        L = EarthHeliocentricLongitude(JD);
        B = EarthHeliocentricLatitude(JD);
        Theta = L + 180;
        Theta = ModFDiv(Theta, 360);
        Beta = -B;
        T = (JD - 2451545) / 36525;
        Lameda = Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
        DeltaTheta = (-0.09033 + 0.03916 * (Cos(Rad(Lameda)) + Sin(Rad(Lameda))) * Tan(Rad(Beta))) / 3600;
        ThetaFK5 = Theta + DeltaTheta;
        DeltaPsi = NutationInLongitude(JD);
        Abberration = (-20.4898 / EarthRadiusVector(JD)) / 3600;
        Lambda = ThetaFK5 ;
        Lambda = ModFDiv(Lambda, 360);
        return Lambda;
    }
    public static double SunGeocentricLatitude(double JD ) {
//  Deklarasi Variabel dan Tipe Variabel

        double L;
        double B;
        double Theta;
        double Beta;
        double T;
        double Lameda;
        double DeltaBeta;
        double BetaFK5;
//  Proses Perhitungan
        L = EarthHeliocentricLongitude(JD);
        B = EarthHeliocentricLatitude(JD);
        Theta = L + 180;
        Theta = ModFDiv(Theta, 360);
        Beta = -B;
        T = (JD - 2451545) / 36525;
        Lameda = Theta - 1.397 * T - 0.00031 * Math.pow(T, 2);
        DeltaBeta = (0.03916 * (Cos(Rad(Lameda)) - Sin(Rad(Lameda)))) / 3600;
        BetaFK5 = Beta + DeltaBeta;
        return  BetaFK5;
    }
    public static double SunGeocentricDistance( double JD ) {
//  Deklarasi Variabel dan Tipe Variabel

        double r;
        r = EarthRadiusVector(JD);
        //r= r * 149597870.7;
        return r;
    }
    public static double SunApparentRightAscension(double JD){
        double Lambda  ;
        double Beta    ;
        double Epsilon ;
        double Alpha   ;

        Lambda = SunGeocentricLongitude(JD);
        Beta = SunGeocentricLatitude(JD);
        Epsilon = ObliquityOfEcliptic(JD);
        Alpha = Deg(Atn2(Sin(Rad(Lambda)) * Cos(Rad(Epsilon)) - Tan(Rad(Beta)) * Sin(Rad(Epsilon)), Cos(Rad(Lambda))));
        Alpha = ModFDiv(Alpha, 360);
        return Alpha;
    }
    public static double SunApparentDeclination(double JD){
        double Lambda  ;
        double Beta    ;
        double Epsilon ;
        double delta   ;

        Lambda = SunGeocentricLongitude(JD);
        Beta = SunGeocentricLatitude(JD);
        Epsilon = ObliquityOfEcliptic(JD);
        delta = Deg(Asn(Sin(Rad(Beta)) * Cos(Rad(Epsilon)) + Cos(Rad(Beta)) * Sin(Rad(Epsilon)) * Sin(Rad(Lambda))));
        return delta;
    }
    public static double SunEquatorialHorizontalParallax(double JD){
        double r ;
        double pi ;
        r = SunGeocentricDistance(JD);
        pi = Deg(Asn(Sin(Rad(8.794 / 3600)) / r));
        return pi;
    }
    public static double SunAngularSemiDiameter(double JD){
        double r ;
        double s0 ;
        double S ;
        r = SunGeocentricDistance(JD);
        s0 = 15 + 59.63 / 60;
        S = s0 / r;
        return S/60;
    }
    public static double EquationOfTime(double JD){
        double tau         ;
        double Alpha       ;
        double DeltaPsi    ;
        double Epsilon     ;
        double L0          ;
        double E           ;

        tau = (JD - 2451545) / 365250;
        Alpha = SunApparentRightAscension(JD);
        DeltaPsi = NutationInLongitude(JD);
        Epsilon = ObliquityOfEcliptic(JD);
        L0 = 280.4664567d + 360007.6982779d * tau + 0.03032028d * Math.pow(tau,2) + Math.pow(tau,3) / 49931d - Math.pow(tau,4) / 15300d - Math.pow(tau,5) / 2000000d;
        L0 = L0 % 360;
        E = L0 - 0.0057183 - Alpha + DeltaPsi * Cos(Rad(Epsilon));
        if (Math.abs(E) * 4 < 20) {
            E = E / 15  ;}
        else if ((Math.abs(E) * 4 >= 20) && (E > 0)) {
            E = E / 15 - 24 ;}
        else if ((Math.abs(E) * 4 >= 20) && (E < 0)) {
            E = E / 15 + 24 ;}
        else {
            E= E/15;}
        return E;
    }
    public static double LuasIrisanDuaLingkaran(double r1,double r2,double jarak) {

        double pi,M0;
        double sudut1;
        double sudut2;
        double LuasLingkaran1;
        double Luaslingkaran2;
        double Luasjuring1;
        double Luasjuring2;
        double Luassegitiga1;
        double Luassegitiga2;
        double Luastembereng1;
        double Luastembereng2;
        pi = Math.PI;

        sudut1 = Deg(Acs((Math.pow(r1,2) + Math.pow(jarak ,2) - Math.pow(r2, 2)) / 2 / r1 / jarak));
        sudut2 = Deg(Acs((Math.pow(r2 ,2) + Math.pow(jarak ,2) - Math.pow(r1 ,2)) / 2 / r2 / jarak));

        LuasLingkaran1 = pi * r1 * r1;
        Luaslingkaran2 = pi * r2 * r2;

        Luasjuring1 = sudut1 * LuasLingkaran1 / 180;
        Luasjuring2 = sudut2 * Luaslingkaran2 / 180;

        Luassegitiga1 = r1 * r1 * Cos(Rad(sudut1)) * Sin(Rad(sudut1));
        Luassegitiga2 = r2 * r2 * Cos(Rad(sudut2)) * Sin(Rad(sudut2));

        Luastembereng1 = Luasjuring1 - Luassegitiga1;
        Luastembereng2 = Luasjuring2 - Luassegitiga2;

        M0 = Luastembereng1 + Luastembereng2;
        return M0;
    }
    public static double MoonGeocentricLongitude(double JD ) {

        double T;
        double LL;
        double D;
        double M;
        double MMM;
        double F;
        double A1;
        double A2;
        double A3;
        double E;
        double lM;
        double lM_True;
        double lM_Appa;
//Proses Perhitungan
        T = (JD - 2451545) / 36525;
        LL =218.3164477 + 481267.88123421 * T - 0.0015786 * Math.pow(T, 2) + Math.pow(T, 3) / 538841 - Math.pow(T,4) / 65194000;
        D = 297.8501921 + 445267.1114034 * T - 0.0018819 * Math.pow(T, 2) + Math.pow(T, 3) / 545868 - Math.pow(T,4) / 113065000;
        M = 357.5291092 + 35999.0502909 * T - 0.0001536 * Math.pow(T, 2) + Math.pow(T, 3) / 24490000;
        MMM = 134.9633964 + 477198.8675055 * T + 0.0087414 * Math.pow(T, 2) + Math.pow(T, 3) / 69699 - Math.pow(T,4) / 14712000;
        F = 93.272095 + 483202.0175233 * T - 0.0036539 * Math.pow(T, 2) - Math.pow(T, 3) / 3526000 + Math.pow(T,4) / 863310000;
        A1 = 119.75 + 131.849 * T;
        A2 = 53.09 + 479264.29 * T;
        A3 = 313.45 + 481266.484 * T;
        E = 1 - 0.002516 * T - 0.0000074 * Math.pow(T, 2);
        LL =Rad(ModFDiv(LL, 360));
        D = Rad(ModFDiv(D, 360));
        M = Rad(ModFDiv(M, 360));
        MMM = Rad(ModFDiv(MMM, 360));
        F = Rad(ModFDiv(F, 360));
        A1 = Rad(ModFDiv(A1, 360));
        A2 = Rad(ModFDiv(A2, 360));
        A3 = Rad(ModFDiv(A3, 360));
        lM = 0;
        lM = lM + 6288774 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + 0 * F);
        lM = lM + 1274027 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -1 * MMM + 0 * F);
        lM = lM + 658314 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 0 * MMM + 0 * F);
        lM = lM + 213618 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 2 * MMM + 0 * F);
        lM = lM + -185116 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 0 * MMM + 0 * F);
        lM = lM + -114332 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 0 * MMM + 2 * F);
        lM = lM + 58793 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -2 * MMM + 0 * F);
        lM = lM + 57066 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + -1 * MMM + 0 * F);
        lM = lM + 53322 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 1 * MMM + 0 * F);
        lM = lM + 45758 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 0 * MMM + 0 * F);
        lM = lM + -40923 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + -1 * MMM + 0 * F);
        lM = lM + -34720 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + 0 * MMM + 0 * F);
        lM = lM + -30383 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 1 * MMM + 0 * F);
        lM = lM + 15327 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 0 * MMM + -2 * F);
        lM = lM + -12528 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + 2 * F);
        lM = lM + 10980 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + -2 * F);
        lM = lM + 10675 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -1 * MMM + 0 * F);
        lM = lM + 10034 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 3 * MMM + 0 * F);
        lM = lM + 8548 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -2 * MMM + 0 * F);
        lM = lM + -7888 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + -1 * MMM + 0 * F);
        lM = lM + -6766 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + 0 * MMM + 0 * F);
        lM = lM + -5163 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + -1 * MMM + 0 * F);
        lM = lM + 4987 * (Math.pow(E, Math.abs(1))) * Sin(1 * D + 1 * M + 0 * MMM + 0 * F);
        lM = lM + 4036 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 1 * MMM + 0 * F);
        lM = lM + 3994 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 2 * MMM + 0 * F);
        lM = lM + 3861 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + 0 * MMM + 0 * F);
        lM = lM + 3665 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -3 * MMM + 0 * F);
        lM = lM + -2689 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + -2 * MMM + 0 * F);
        lM = lM + -2602 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -1 * MMM + 2 * F);
        lM = lM + 2390 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + -2 * MMM + 0 * F);
        lM = lM + -2348 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + 1 * MMM + 0 * F);
        lM = lM + 2236 * (Math.pow(E, Math.abs(-2))) * Sin(2 * D + -2 * M + 0 * MMM + 0 * F);
        lM = lM + -2120 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 2 * MMM + 0 * F);
        lM = lM + -2069 * (Math.pow(E, Math.abs(2))) * Sin(0 * D + 2 * M + 0 * MMM + 0 * F);
        lM = lM + 2048 * (Math.pow(E, Math.abs(-2))) * Sin(2 * D + -2 * M + -1 * MMM + 0 * F);
        lM = lM + -1773 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 1 * MMM + -2 * F);
        lM = lM + -1595 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 0 * MMM + 2 * F);
        lM = lM + 1215 * (Math.pow(E, Math.abs(-1))) * Sin(4 * D + -1 * M + -1 * MMM + 0 * F);
        lM = lM + -1110 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 2 * MMM + 2 * F);
        lM = lM + -892 * (Math.pow(E, Math.abs(0))) * Sin(3 * D + 0 * M + -1 * MMM + 0 * F);
        lM = lM + -810 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + 1 * MMM + 0 * F);
        lM = lM + 759 * (Math.pow(E, Math.abs(-1))) * Sin(4 * D + -1 * M + -2 * MMM + 0 * F);
        lM = lM + -713 * (Math.pow(E, Math.abs(2))) * Sin(0 * D + 2 * M + -1 * MMM + 0 * F);
        lM = lM + -700 * (Math.pow(E, Math.abs(2))) * Sin(2 * D + 2 * M + -1 * MMM + 0 * F);
        lM = lM + 691 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + -2 * MMM + 0 * F);
        lM = lM + 596 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 0 * MMM + -2 * F);
        lM = lM + 549 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + 1 * MMM + 0 * F);
        lM = lM + 537 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 4 * MMM + 0 * F);
        lM = lM + 520 * (Math.pow(E, Math.abs(-1))) * Sin(4 * D + -1 * M + 0 * MMM + 0 * F);
        lM = lM + -487 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + -2 * MMM + 0 * F);
        lM = lM + -399 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + 0 * MMM + -2 * F);
        lM = lM + -381 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 2 * MMM + -2 * F);
        lM = lM + 351 * (Math.pow(E, Math.abs(1))) * Sin(1 * D + 1 * M + 1 * MMM + 0 * F);
        lM = lM + -340 * (Math.pow(E, Math.abs(0))) * Sin(3 * D + 0 * M + -2 * MMM + 0 * F);
        lM = lM + 330 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -3 * MMM + 0 * F);
        lM = lM + 327 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 2 * MMM + 0 * F);
        lM = lM + -323 * (Math.pow(E, Math.abs(2))) * Sin(0 * D + 2 * M + 1 * MMM + 0 * F);
        lM = lM + 299 * (Math.pow(E, Math.abs(1))) * Sin(1 * D + 1 * M + -1 * MMM + 0 * F);
        lM = lM + 294 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 3 * MMM + 0 * F);
        lM = lM + 0 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -1 * MMM + -2 * F);
        lM = lM + (3958 * Sin(A1) + 1962 * Sin(LL - F) + 318 * Sin(A2));
        lM_True = Deg(LL) + lM / 1000000;
        lM_True = ModFDiv(lM_True, 360);
        lM_Appa = lM_True + NutationInLongitude(JD);
        lM_Appa = ModFDiv(lM_Appa, 360);
        return lM_Appa;
    }
    public static double LunarDistance(double JD ) {

        double T;
        double LL;
        double D;
        double M;
        double MMM;
        double F;
        double A1;
        double A2;
        double A3;
        double E;
        double lM;
        double lM_True;
        double lM_Appa;
//Proses Perhitungan
        T = (JD - 2451545) / 36525;
        LL = 218.3164477 + 481267.88123421 * T - 0.0015786 * Math.pow(T, 2) + Math.pow(T, 3) / 538841 - Math.pow(T, 4) / 65194000;
        D = 297.8501921 + 445267.1114034 * T - 0.0018819 * Math.pow(T, 2) + Math.pow(T, 3) / 545868 - Math.pow(T, 4) / 113065000;
        M = 357.5291092 + 35999.0502909 * T - 0.0001536 * Math.pow(T, 2) + Math.pow(T, 3) / 24490000;
        F = ModFDiv(134.9633964 + 477198.8675055 * T + 0.0087414 * Math.pow(T, 2) + Math.pow(T, 3) / 69699 - Math.pow(T, 4) / 14712000, 360);
        MMM = Rad(F);
        E = Rad(F * 2);
        F = 1 + (-20954 * Cos(MMM) - 3699 * Cos(E - MMM) - 2956 * Cos(E)) / 385000;
        return F;
    }
    public static double MoonGeocentricLatitude(double JD ) {

        double T;
        double LL;
        double D;
        double M;
        double MMM;
        double F;
        double A1;
        double A2;
        double A3;
        double E;
        double bM;
        double Result;
//Proses Perhitungan
        T = (JD - 2451545) / 36525;
        LL = 218.3164477 + 481267.88123421 * T - 0.0015786 * Math.pow(T, 2) + Math.pow(T, 3) / 538841 - Math.pow(T, 4) / 65194000;
        D = 297.8501921 + 445267.1114034 * T - 0.0018819 * Math.pow(T, 2) + Math.pow(T, 3) / 545868 - Math.pow(T, 4) / 113065000;
        M = 357.5291092 + 35999.0502909 * T - 0.0001536 * Math.pow(T, 2) + Math.pow(T, 3) / 24490000;
        MMM = 134.9633964 + 477198.8675055 * T + 0.0087414 * Math.pow(T, 2) + Math.pow(T, 3) / 69699 - Math.pow(T, 4) / 14712000;
        F = 93.272095 + 483202.0175233 * T - 0.0036539 * Math.pow(T, 2) - Math.pow(T, 3) / 3526000 + Math.pow(T, 4) / 863310000;
        A1 = 119.75 + 131.849 * T;
        A2 = 53.09 + 479264.29 * T;
        A3 = 313.45 + 481266.484 * T;
        E = 1 - 0.002516 * T - 0.0000074 * Math.pow(T, 2);
        LL = Rad(ModFDiv(LL, 360));
        D = Rad(ModFDiv(D, 360));
        M = Rad(ModFDiv(M, 360));
        MMM = Rad(ModFDiv(MMM, 360));
        F = Rad(ModFDiv(F, 360));
        A1 = Rad(ModFDiv(A1, 360));
        A2 = Rad(ModFDiv(A2, 360));
        A3 = Rad(ModFDiv(A3, 360));
        bM = 0;
        bM = bM + 5128122 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 0 * MMM + 1 * F);
        bM = bM + 280602 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + 1 * F);
        bM = bM + 277693 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + -1 * F);
        bM = bM + 173237 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 0 * MMM + -1 * F);
        bM = bM + 55413 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -1 * MMM + 1 * F);
        bM = bM + 46271 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -1 * MMM + -1 * F);
        bM = bM + 32573 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 0 * MMM + 1 * F);
        bM = bM + 17198 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 2 * MMM + 1 * F);
        bM = bM + 9266 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 1 * MMM + -1 * F);
        bM = bM + 8822 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 2 * MMM + -1 * F);
        bM = bM + 8216 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 0 * MMM + -1 * F);
        bM = bM + 4324 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -2 * MMM + -1 * F);
        bM = bM + 4200 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 1 * MMM + 1 * F);
        bM = bM + -3359 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + 0 * MMM + -1 * F);
        bM = bM + 2463 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + -1 * MMM + 1 * F);
        bM = bM + 2211 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 0 * MMM + 1 * F);
        bM = bM + 2065 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + -1 * MMM + -1 * F);
        bM = bM + -1870 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + -1 * MMM + -1 * F);
        bM = bM + 1828 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -1 * MMM + -1 * F);
        bM = bM + -1794 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 0 * MMM + 1 * F);
        bM = bM + -1749 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 0 * MMM + 3 * F);
        bM = bM + -1565 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + -1 * MMM + 1 * F);
        bM = bM + -1491 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + 0 * MMM + 1 * F);
        bM = bM + -1475 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 1 * MMM + 1 * F);
        bM = bM + -1410 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 1 * MMM + -1 * F);
        bM = bM + -1344 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 0 * MMM + -1 * F);
        bM = bM + -1335 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + 0 * MMM + -1 * F);
        bM = bM + 1107 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 3 * MMM + 1 * F);
        bM = bM + 1021 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + 0 * MMM + -1 * F);
        bM = bM + 833 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -1 * MMM + 1 * F);
        bM = bM + 777 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + -3 * F);
        bM = bM + 671 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -2 * MMM + 1 * F);
        bM = bM + 607 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 0 * MMM + -3 * F);
        bM = bM + 596 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 2 * MMM + -1 * F);
        bM = bM + 491 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 1 * MMM + -1 * F);
        bM = bM + -451 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -2 * MMM + 1 * F);
        bM = bM + 439 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 3 * MMM + -1 * F);
        bM = bM + 422 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + 2 * MMM + 1 * F);
        bM = bM + 421 * (Math.pow(E, Math.abs(0))) * Sin(2 * D + 0 * M + -3 * MMM + -1 * F);
        bM = bM + -366 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + -1 * MMM + 1 * F);
        bM = bM + -351 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + 0 * MMM + 1 * F);
        bM = bM + 331 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + 0 * MMM + 1 * F);
        bM = bM + 315 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + 1 * MMM + 1 * F);
        bM = bM + 302 * (Math.pow(E, Math.abs(-2))) * Sin(2 * D + -2 * M + 0 * MMM + -1 * F);
        bM = bM + -283 * (Math.pow(E, Math.abs(0))) * Sin(0 * D + 0 * M + 1 * MMM + 3 * F);
        bM = bM + -229 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + 1 * MMM + -1 * F);
        bM = bM + 223 * (Math.pow(E, Math.abs(1))) * Sin(1 * D + 1 * M + 0 * MMM + -1 * F);
        bM = bM + 223 * (Math.pow(E, Math.abs(1))) * Sin(1 * D + 1 * M + 0 * MMM + 1 * F);
        bM = bM + -220 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + -2 * MMM + -1 * F);
        bM = bM + -220 * (Math.pow(E, Math.abs(1))) * Sin(2 * D + 1 * M + -1 * MMM + -1 * F);
        bM = bM + -185 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + 1 * MMM + 1 * F);
        bM = bM + 181 * (Math.pow(E, Math.abs(-1))) * Sin(2 * D + -1 * M + -2 * MMM + -1 * F);
        bM = bM + -177 * (Math.pow(E, Math.abs(1))) * Sin(0 * D + 1 * M + 2 * MMM + 1 * F);
        bM = bM + 176 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + -2 * MMM + -1 * F);
        bM = bM + 166 * (Math.pow(E, Math.abs(-1))) * Sin(4 * D + -1 * M + -1 * MMM + -1 * F);
        bM = bM + -164 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + 1 * MMM + -1 * F);
        bM = bM + 132 * (Math.pow(E, Math.abs(0))) * Sin(4 * D + 0 * M + 1 * MMM + -1 * F);
        bM = bM + -119 * (Math.pow(E, Math.abs(0))) * Sin(1 * D + 0 * M + -1 * MMM + -1 * F);
        bM = bM + 115 * (Math.pow(E, Math.abs(-1))) * Sin(4 * D + -1 * M + 0 * MMM + -1 * F);
        bM = bM + 107 * (Math.pow(E, Math.abs(-2))) * Sin(2 * D + -2 * M + 0 * MMM + 1 * F);
        bM = bM + (-2235 * Sin(LL)
                + 382 * Sin(A3)
                + 175 * Sin(A1 - F)
                + 175 * Sin(A1 + F)
                + 127 * Sin(LL - MMM)
                - 115 * Sin(LL + MMM));
        bM = bM / 1000000;
        return bM;
    }
    public static double MoonGeocentricDistance(double JD ) {

        double T;
        double LL;
        double D;
        double M;
        double MMM;
        double F;
        double A1;
        double A2;
        double A3;
        double E;
        double rM;
//Proses Perhitungan
        T = (JD - 2451545) / 36525;
        LL = 218.3164477 + 481267.88123421 * T - 0.0015786 * Math.pow(T, 2) + Math.pow(T, 3) / 538841 - Math.pow(T, 4) / 65194000;
        D = 297.8501921 + 445267.1114034 * T - 0.0018819 * Math.pow(T, 2) + Math.pow(T, 3) / 545868 - Math.pow(T, 4) / 113065000;
        M = 357.5291092 + 35999.0502909 * T - 0.0001536 * Math.pow(T, 2) + Math.pow(T, 3) / 24490000;
        MMM = 134.9633964 + 477198.8675055 * T + 0.0087414 * Math.pow(T, 2) + Math.pow(T, 3) / 69699 - Math.pow(T, 4) / 14712000;
        F = 93.272095 + 483202.0175233 * T - 0.0036539 * Math.pow(T, 2) - Math.pow(T, 3) / 3526000 + Math.pow(T, 4) / 863310000;
        A1 = 119.75 + 131.849 * T;
        A2 = 53.09 + 479264.29 * T;
        A3 = 313.45 + 481266.484 * T;
        E = 1 - 0.002516 * T - 0.0000074 * Math.pow(T, 2);
        LL = Rad(ModFDiv(LL, 360));
        D = Rad(ModFDiv(D, 360));
        M = Rad(ModFDiv(M, 360));
        MMM = Rad(ModFDiv(MMM, 360));
        F = Rad(ModFDiv(F, 360));
        A1 = Rad(ModFDiv(A1, 360));
        A2 = Rad(ModFDiv(A2, 360));
        A3 = Rad(ModFDiv(A3, 360));
        rM = 0;
        rM = rM + -20905355 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 1 * MMM + 0 * F);
        rM = rM + -3699111 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + -1 * MMM + 0 * F);
        rM = rM + -2955968 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 0 * MMM + 0 * F);
        rM = rM + -569925 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 2 * MMM + 0 * F);
        rM = rM + 48888 * (Math.pow(E, Math.abs(1))) * Cos(0 * D + 1 * M + 0 * MMM + 0 * F);
        rM = rM + -3149 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 0 * MMM + 2 * F);
        rM = rM + 246158 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + -2 * MMM + 0 * F);
        rM = rM + -152138 * (Math.pow(E, Math.abs(-1))) * Cos(2 * D + -1 * M + -1 * MMM + 0 * F);
        rM = rM + -170733 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 1 * MMM + 0 * F);
        rM = rM + -204586 * (Math.pow(E, Math.abs(-1))) * Cos(2 * D + -1 * M + 0 * MMM + 0 * F);
        rM = rM + -129620 * (Math.pow(E, Math.abs(1))) * Cos(0 * D + 1 * M + -1 * MMM + 0 * F);
        rM = rM + 108743 * (Math.pow(E, Math.abs(0))) * Cos(1 * D + 0 * M + 0 * MMM + 0 * F);
        rM = rM + 104755 * (Math.pow(E, Math.abs(1))) * Cos(0 * D + 1 * M + 1 * MMM + 0 * F);
        rM = rM + 10321 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 0 * MMM + -2 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 1 * MMM + 2 * F);
        rM = rM + 79661 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 1 * MMM + -2 * F);
        rM = rM + -34782 * (Math.pow(E, Math.abs(0))) * Cos(4 * D + 0 * M + -1 * MMM + 0 * F);
        rM = rM + -23210 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 3 * MMM + 0 * F);
        rM = rM + -21636 * (Math.pow(E, Math.abs(0))) * Cos(4 * D + 0 * M + -2 * MMM + 0 * F);
        rM = rM + 24208 * (Math.pow(E, Math.abs(1))) * Cos(2 * D + 1 * M + -1 * MMM + 0 * F);
        rM = rM + 30824 * (Math.pow(E, Math.abs(1))) * Cos(2 * D + 1 * M + 0 * MMM + 0 * F);
        rM = rM + -8379 * (Math.pow(E, Math.abs(0))) * Cos(1 * D + 0 * M + -1 * MMM + 0 * F);
        rM = rM + -16675 * (Math.pow(E, Math.abs(1))) * Cos(1 * D + 1 * M + 0 * MMM + 0 * F);
        rM = rM + -12831 * (Math.pow(E, Math.abs(-1))) * Cos(2 * D + -1 * M + 1 * MMM + 0 * F);
        rM = rM + -10445 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 2 * MMM + 0 * F);
        rM = rM + -11650 * (Math.pow(E, Math.abs(0))) * Cos(4 * D + 0 * M + 0 * MMM + 0 * F);
        rM = rM + 14403 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + -3 * MMM + 0 * F);
        rM = rM + -7003 * (Math.pow(E, Math.abs(1))) * Cos(0 * D + 1 * M + -2 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + -1 * MMM + 2 * F);
        rM = rM + 10056 * (Math.pow(E, Math.abs(-1))) * Cos(2 * D + -1 * M + -2 * MMM + 0 * F);
        rM = rM + 6322 * (Math.pow(E, Math.abs(0))) * Cos(1 * D + 0 * M + 1 * MMM + 0 * F);
        rM = rM + -9884 * (Math.pow(E, Math.abs(-2))) * Cos(2 * D + -2 * M + 0 * MMM + 0 * F);
        rM = rM + 5751 * (Math.pow(E, Math.abs(1))) * Cos(0 * D + 1 * M + 2 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(2))) * Cos(0 * D + 2 * M + 0 * MMM + 0 * F);
        rM = rM + -4950 * (Math.pow(E, Math.abs(-2))) * Cos(2 * D + -2 * M + -1 * MMM + 0 * F);
        rM = rM + 4130 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 1 * MMM + -2 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 0 * MMM + 2 * F);
        rM = rM + -3958 * (Math.pow(E, Math.abs(-1))) * Cos(4 * D + -1 * M + -1 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 2 * MMM + 2 * F);
        rM = rM + 3258 * (Math.pow(E, Math.abs(0))) * Cos(3 * D + 0 * M + -1 * MMM + 0 * F);
        rM = rM + 2616 * (Math.pow(E, Math.abs(1))) * Cos(2 * D + 1 * M + 1 * MMM + 0 * F);
        rM = rM + -1897 * (Math.pow(E, Math.abs(-1))) * Cos(4 * D + -1 * M + -2 * MMM + 0 * F);
        rM = rM + -2117 * (Math.pow(E, Math.abs(2))) * Cos(0 * D + 2 * M + -1 * MMM + 0 * F);
        rM = rM + 2354 * (Math.pow(E, Math.abs(2))) * Cos(2 * D + 2 * M + -1 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(1))) * Cos(2 * D + 1 * M + -2 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(-1))) * Cos(2 * D + -1 * M + 0 * MMM + -2 * F);
        rM = rM + -1423 * (Math.pow(E, Math.abs(0))) * Cos(4 * D + 0 * M + 1 * MMM + 0 * F);
        rM = rM + -1117 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 4 * MMM + 0 * F);
        rM = rM + -1571 * (Math.pow(E, Math.abs(-1))) * Cos(4 * D + -1 * M + 0 * MMM + 0 * F);
        rM = rM + -1739 * (Math.pow(E, Math.abs(0))) * Cos(1 * D + 0 * M + -2 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(1))) * Cos(2 * D + 1 * M + 0 * MMM + -2 * F);
        rM = rM + -4421 * (Math.pow(E, Math.abs(0))) * Cos(0 * D + 0 * M + 2 * MMM + -2 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(1))) * Cos(1 * D + 1 * M + 1 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(3 * D + 0 * M + -2 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(4 * D + 0 * M + -3 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(-1))) * Cos(2 * D + -1 * M + 2 * MMM + 0 * F);
        rM = rM + 1165 * (Math.pow(E, Math.abs(2))) * Cos(0 * D + 2 * M + 1 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(1))) * Cos(1 * D + 1 * M + -1 * MMM + 0 * F);
        rM = rM + 0 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + 3 * MMM + 0 * F);
        rM = rM + 8752 * (Math.pow(E, Math.abs(0))) * Cos(2 * D + 0 * M + -1 * MMM + -2 * F);
        rM = 385000.56 + rM / 1000;
        return rM;
    }
    public static double ARB(double JD ) {

        double Lambda;
        double Beta;
        double Epsilon;
        double Alpha;
//Proses Perhitungan
        Lambda = MoonGeocentricLongitude(JD);
        Beta = MoonGeocentricLatitude(JD);
        Epsilon = ObliquityOfEcliptic(JD);
        Alpha = Deg(Atn2(Sin(Rad(Lambda)) * Cos(Rad(Epsilon)) - Tan(Rad(Beta)) * Sin(Rad(Epsilon)), Cos(Rad(Lambda))));
        Alpha = ModFDiv(Alpha, 360);
        return Alpha;
    }
    public static double DECB(double JD ) {

        double Lambda;
        double Beta;
        double Epsilon;
        double delta;
//Proses Perhitungan
        Lambda = MoonGeocentricLongitude(JD);
        Beta = MoonGeocentricLatitude(JD);
        Epsilon = ObliquityOfEcliptic(JD);
        delta = Deg(Asn(Sin(Rad(Beta)) * Cos(Rad(Epsilon)) + Cos(Rad(Beta)) * Sin(Rad(Epsilon)) * Sin(Rad(Lambda))));
        return delta;
    }
    public static double MoonParallax(double JD ) {

        double r;
        double pi;
//Proses Perhitungan
        r = MoonGeocentricDistance(JD);
        pi = Deg(Asn(6378.14 / r));
        return pi;
    }
    public static double SDB(double JD ) {

        double r;
        double pi;
        double k;
        double S;
//Proses Perhitungan
        r = MoonGeocentricDistance(JD);
        pi = MoonParallax(JD);
        k = 0.272481;
        S = Deg(Asn(k * Sin(Rad(pi))));
        S = (358473400 / r) / 3600;
        return S;
    }
    public static double MoonSunGeocentricElongation(double JD ) {

        double DeltaSun;
        double AlphaSun;
        double DeltaMoon;
        double AlphaMoon;
        double Psi;
//Proses Perhitungan
        DeltaSun = SunApparentDeclination(JD);
        AlphaSun = SunApparentRightAscension(JD);
        DeltaMoon = DECB(JD);
        AlphaMoon = ARB(JD);
        Psi = Deg(Acs(Sin(Rad(DeltaSun)) * Sin(Rad(DeltaMoon)) + Cos(Rad(DeltaSun)) * Cos(Rad(DeltaMoon)) * Cos(Rad(AlphaSun - AlphaMoon))));
        return Psi;
    }
    public static double MoonDiskIlluminatedFraction(double JD) {

        double RSun, mob, Dummy;
        double RMoon, TrueBeta, TrueLambda;
        double Psi;
        double IL;
        double kk, bh,Y,X,Z;
//Proses Perhitungan
        mob = Rad(SunGeocentricLongitude(JD));
        TrueBeta = Rad(MoonGeocentricLatitude(JD));
        TrueLambda = Rad(MoonGeocentricLongitude(JD));
        RSun = SunGeocentricDistance(JD) * 145980000 / 385000;
        RMoon = LunarDistance(JD);
        Dummy = Cos((TrueBeta)) * Cos((TrueLambda - mob));
        Psi = Math.PI / 2 - Atn(Dummy / Math.sqrt(1 - Dummy * Dummy));
        //Psi = MoonSunGeocentricElongation(JD);
        Y = RSun * Sin((Psi));
        X = RMoon - RSun * Dummy;
        IL = Atn2(Y, X);
        Z = Deg(IL);
        kk = (1 + Cos(IL)) / 2;
        //bh= kk / 2;
        return kk;

    }
    public static double MoonBrightLimbAngle(double JD ) {

        double DeltaSun;
        double AlphaSun;
        double DeltaMoon;
        double AlphaMoon;
        double y_Num;
        double x_Num;
        double Chi;
//Proses Perhitungan
        DeltaSun = SunApparentDeclination(JD);
        AlphaSun = SunApparentRightAscension(JD);
        DeltaMoon = DECB(JD);
        AlphaMoon = ARB(JD);
        y_Num = Cos(Rad(DeltaSun)) * Sin(Rad(AlphaSun - AlphaMoon));
        x_Num = Sin(Rad(DeltaSun)) * Cos(Rad(DeltaMoon)) - Cos(Rad(DeltaSun)) * Sin(Rad(DeltaMoon)) * Cos(Rad(AlphaSun - AlphaMoon));
        Chi = Deg(Atn2(y_Num, x_Num));
        Chi = ModFDiv(Chi, 360);
        return Chi;
    }
    public static double GHASun(double JD ) {
        double tau;
        double eps;
        double dlt;
        double gstn;
        double gst;
        double sha;
        double gha;
        double arm;

        arm = SunApparentRightAscension(JD);
        tau = (JD - 2451545) / 36525;
        eps = NutationInLongitude(JD);
        dlt = ObliquityOfEcliptic(JD);
        gstn = ModFDiv((280.46061837 + 360.98564736629 * (JD - 2451545) + 0.000387933 * Math.pow(tau,2) - Math.pow(tau,3) / 38710000), 360) / 15;
        gst = gstn + eps * Cos(Rad(dlt)) / 15;
        gha = 15 * gst;
        sha = 360 - 15 * (arm / 15);
        return ModFDiv(sha + gha, 360);
    }
    public static double GHAMoon(double JD ) {
        double tau;
        double eps;
        double dlt;
        double gstn;
        double gst;
        double sha;
        double gha;
        double arb;

        arb = ARB(JD);
        tau = (JD - 2451545) / 36525;
        eps = NutationInLongitude(JD);
        dlt = ObliquityOfEcliptic(JD);
        gstn = ModFDiv((280.46061837 + 360.98564736629 * (JD - 2451545) + 0.000387933 * Math.pow(tau,2) - Math.pow(tau,3) / 38710000), 360) / 15;
        gst = gstn + eps * Cos(Rad(dlt)) / 15;
        gha = 15 * gst;
        sha = 360 - 15 * (arb / 15);
        return ModFDiv(sha + gha, 360);
    }
    public static double GMST(double JD ) {
        double tau;
        double gstn;

        tau = (JD - 2451545) / 36525;

        gstn = ModFDiv((280.46061837 + 360.98564736629 * (JD - 2451545) + 0.000387933 * Math.pow(tau,2) - Math.pow(tau,3) / 38710000), 360) / 15;

        return gstn;
    }

    public static double Refraksi(double h0,double P,double T){
        double R, dR1, dR2;

        R = 1 / Tan(Rad(h0 + 7.31 / (h0 + 4.4))) + 0.0013515;
        dR1 = -0.06 * Sin(Rad(14.7 * R / 60 + 13));
        dR2 = (P / 1010) * (283 / (273 + T));
        return  (R + dR1 / 60) * dR2;
    }

    public static double JDE(double JD){

        return  JD+DeltaT(JD)/86400;
    }
    public static double moonrise(double Lt,double Bt,double Tz,double Tgl,double Bln,double Thn){
        double R, dR1, dR2,jd,jde,delta,arb,dec,hrise,h0,m0,M;
        double a1,b1,a2,b2,c1,c2,dm,theta,h,hh,n,rise,gmst,D;
        jd = KMJDf (Tgl,Bln,Thn,0,0);
        jde = JDE(jd);
        gmst = GMST(jd)*15;
        dec = DECB(jd);
        arb = ARB(jd);
        delta = DeltaT(jd)/86400;
        hrise = 0.7275*MoonParallax(jd)-Refraksi(0,1010,23)/60;
        h0 = Acs((Sin(Rad(hrise)) - Sin(Rad(Lt)) * Sin(Rad(dec))) / (Cos(Rad(Lt)) * Cos(Rad(dec))));
        a1 = dec - DECB(jd - 1);
        b1 = DECB(jd + 1)- dec;
        c1 = b1-a1;
        a2 = arb-ARB(jd-1);
        b2 = ARB(jd+1)-arb;
        c2 = b2-a2;

        m0 = ModFDiv((arb - Bt - gmst) / 360, 1);
        M =  m0 - Deg(h0) / 360;
        theta = gmst + 360.985647 * M ;
        n = M + delta / 86400;
        D = Rad(dec + 0.5 * n * (a1 + b1 + n * c1));
        h = Rad(theta + Bt - (arb + 0.5 * n * (a2 + b2 + n * c2)));
        hh = Deg(Asn(Sin(Rad(Lt)) * Sin(D) + Cos(Rad(Lt)) * Cos(D) * Cos(h)));
        dm = (hh - hrise) / (360 * Cos(Rad(Lt)) * Cos(D) * Sin(h));
        M = M + dm;
        rise =  (jde + M + Tz / 24 - delta) - jd;

        return rise*24 ;
    }

    public static double moonset(double Lt,double Bt,double Tz,double Tgl,double Bln,double Thn){
        double R, dR1, dR2,jd,jde,delta,arb,dec,hrise,h0,m0,M;
        double a1,b1,a2,b2,c1,c2,dm,theta,h,hh,n,rise,gmst,D;
        jd = KMJDf(Tgl,Bln,Thn,0,0);
        jde = JDE(jd);
        gmst = GMST(jd)*15;
        dec = DECB(jd);
        arb = ARB(jd);
        delta = DeltaT(jd)/86400;
        hrise = 0.7275*MoonParallax(jd)-Refraksi(0,1010,23)/60;
        h0 = Acs((Sin(Rad(hrise)) - Sin(Rad(Lt)) * Sin(Rad(dec))) / (Cos(Rad(Lt)) * Cos(Rad(dec))));
        a1 = dec - DECB(jd - 1);
        b1 = DECB(jd + 1)- dec;
        c1 = b1-a1;
        a2 = arb-ARB(jd-1);
        b2 = ARB(jd+1)-arb;
        c2 = b2-a2;

        m0 = ModFDiv((arb - Bt - gmst) / 360, 1);
        M =  m0 + Deg(h0) / 360;

        theta = gmst + 360.985647 * M ;
        n = M + delta / 86400;
        D = Rad(dec + 0.5 * n * (a1 + b1 + n * c1));
        h = Rad(theta + Bt - (arb + 0.5 * n * (a2 + b2 + n * c2)));
        hh = Deg(Asn(Sin(Rad(Lt)) * Sin(D) + Cos(Rad(Lt)) * Cos(D) * Cos(h)));
        dm = (hh - hrise) / (360 * Cos(Rad(Lt)) * Cos(D) * Sin(h));
        M = M + dm;
        rise =  (jde + M + Tz / 24 - delta) - jd;

        return rise*24 ;
    }

    public static String DMS2(double data) {
        double AbsData, D, MD, M, SD,S;
        AbsData = Math.abs(data); // data dijadikan Absolut
        //AbsData=AskRound0(AbsData*60)/60;
        D=(int)AbsData; // hasil jam
        MD=((AbsData-D) *60)+1 ; // menit dengan desimal
        M=(int)MD; // hasil menit

        double menit, detik;
        if (M ==60) { // menghindari menit tampil 60
            menit = 0;D=D+1; }
        else { menit=M;D=D;};
        String Tanda1,Tanda2,Tanda3;
        if (data<0) {Tanda1="-";} else {Tanda1="";}
        if (data<0) {Tanda2="-";} else {Tanda2=" ";}
        if (data<0) {Tanda3="-";} else {Tanda3="";}

        String Hasil1= Tanda3+ (new DecimalFormat ("00")).format(D) + " : "
                + (new DecimalFormat("00")).format(menit) ;

        return Hasil1;
    }

    public static String DMS21(double data) {
        double AbsData, D, MD, M, SD,S;
        AbsData = Math.abs(data); // data dijadikan Absolut
        //AbsData=AskRound0(AbsData*60)/60;
        D=(int)AbsData; // hasil jam
        MD=((AbsData-D) *60)+0 ; // menit dengan desimal
        M=(int)MD; // hasil menit

        double menit, detik;
        if (M ==60) { // menghindari menit tampil 60
            menit = 0;D=D+1; }
        else { menit=M;D=D;};
        String Tanda1,Tanda2,Tanda3;
        if (data<0) {Tanda1="-";} else {Tanda1="";}
        if (data<0) {Tanda2="-";} else {Tanda2=" ";}
        if (data<0) {Tanda3="-";} else {Tanda3="";}

        String Hasil1= Tanda3+ (new DecimalFormat("00")).format(D) + " : "
                + (new DecimalFormat("00")).format(menit) ;

        return Hasil1;
    }

    public static String DMS3(double data) {
        double AbsData, D, MD, M, SD,S;
        AbsData = Math.abs(data); // data dijadikan Absolut
        D=(int)AbsData; // hasil jam
        MD=(AbsData-D) *60 ; // menit dengan desimal
        M=(int)MD; // hasil menit
        SD=(((AbsData-D) *60) -M)*60 ; // detik dengan desimal
        double menit, detik;
        if (SD >30) {  //menghindari detik tampil 60
            detik = 0;menit=M+1; }
        else { detik=SD;menit=M;};
        if (M ==60) { // menghindari menit tampil 60
            menit = 0;D=D+1; }
        else { menit=M;D=D;};
        String Tanda1,Tanda2,Tanda3;
        if (data<0) {Tanda1="-";} else {Tanda1="";}
        if (data<0) {Tanda2="-";} else {Tanda2=" ";}
        if (data<0) {Tanda3="-";} else {Tanda3="";}
        String Hasil1= Tanda3+ (new DecimalFormat("00")).format(D) + " : "
                + (new DecimalFormat("00")).format(menit) ;
        return Hasil1;
    }
    public static double AskRound10(double Data){
        double hsl;
        double A, B, C, D, E, F;
        A=(int) Data;
        B=(Data-A) *1;
        C=(int) B;
        D=B-C;
        if (D>0.5D) {E=1;}
        else {E=0;}
        F=A+(C+E) /1;
        hsl=F;
        return hsl;
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
    public static double AskRound5(double Data){
        double hsl;
        double A, B, C, D, E, F;
        A=(int) Data;
        B=(Data-A) *100000;
        C=(int) B;
        D=B-C;
        if (D>0.5D) {E=1;}
        else {E=0;}
        F=A+(C+E) /100000;
        hsl=F;
        return hsl;
    }
}
