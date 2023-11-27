#include <stdio.h>
#include <stdlib.h>

void backtracking(int temp, int lenTemp, int n, FILE *out, int buf);

void backtracking(int temp, int lenTemp, int n, FILE *out, int buf)
{
    if (lenTemp == n)
    {
        fprintf(out, "%d\n", temp);
        return;
    }

    int cur = temp;
    int i = 0;

    for (i = 0; i < n; i++)
    {
        if ((buf & (1 << (i + 1))) == 0)
        {
            cur = cur * 10 + i + 1;
            buf |= (1 << (i + 1));
            backtracking(cur, lenTemp + 1, n, out, buf);
            buf ^= (1 << (i + 1));
            cur = cur * 0.1;
        }
    }

    return;
}

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    int n = 0;
    fscanf(in, "%d", &n);

    backtracking(0, 0, n, out, 0);

    return 0;
}