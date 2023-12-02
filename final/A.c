// run 1ms !!!
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    long long x = 1;

    fscanf(in, "%lli", &x);

    if (x == 1)
    {
        fprintf(out, "%lli", x);

        fclose(in);
        fclose(out);

        return 0;
    }

    long long l = 1;
    long long r = x * x;
    long long c = 0;
    long long a1, a2, a3;
    long long p, res;

    double pow2, pow3;

    while (l < r)
    {
        c = (l + r + 1) * 0.5;

        a1 = pow(c * 1.0, 1.0 / 2.0);
        a2 = pow(c * 1.0, 1.0 / 3.0);
        a3 = pow(c * 1.0, 1.0 / 6.0);

        if (a1 + a2 - a3 < x)
        {
            l = c;
        }
        else
        {
            r = c - 1;
        }
    }

    pow2 = pow(1.0 * l, 1.0 / 2.0) + 1.0;
    pow3 = pow(1.0 * l, 1.0 / 3.0) + 1.0;

    if (pow2 * pow2 > pow3 * pow3 * pow3)
    {
        p = pow3;
        res = p * p * p;
        fprintf(out, "%lli", res);
    }
    else
    {
        p = pow2;
        res = p * p;
        fprintf(out, "%lli", res);
    }

    fclose(in);
    fclose(out);

    return 0;
}