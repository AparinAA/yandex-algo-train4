// Z-функция без использования hash строки и бинпоиска
#include <stdio.h>
#include <stdlib.h>

#define MOD 1000000007
#define _x 257
#define max(x, y) x > y ? x : y
#define min(x, y) x < y ? x : y

int isEqual(long int *hash, long int *x, int a, int b, int l);
int binSearch(long int *hash, long int *x, int left, int right);

int isEqual(long int *hash, long int *x, int a, int b, int l)
{
    if ((hash[a] * x[l] + hash[b + l]) % MOD == (hash[b] * x[l] + hash[a + l]) % MOD)
    {
        return 1;
    }

    return 0;
}

int binSearch(long int *hash, long int *x, int left, int right)
{
    int l = left;
    int r = right + 1;
    int c;

    while (l < r)
    {
        c = (l + r + 1) / 2;
        if (isEqual(hash, x, 0, left, c - left))
        {
            l = c;
        }
        else
        {
            r = c - 1;
        }
    }

    return l - left;
}

int main(void)
{
    FILE *in = fopen("input.txt", "r");
    FILE *out = fopen("output.txt", "w");

    int n = 0, i = 0;
    char c;
    char str[1000002];

    // Можно считывать посимвольно
    // сначала посчитать сколько символов
    // while (fscanf(in, "%c", &c) == 1 && c != '\n')
    // {
    //     n++;
    // }
    // поставить указатель на начало файла
    // fseek(in, 0, SEEK_SET);

    fscanf(in, "%s", str);

    while ((int)str[n] <= (int)'z' && (int)str[n] >= (int)'a')
    {
        n++;
    }

    // создать динамический массив char это будет строка
    //  char *str = (char *)malloc(sizeof(char) * n);
    int *z = (int *)malloc(sizeof(int) * n);

    int l = 0;
    int r = 0;

    for (i = 0; i < n; i++)
    {
        z[i] = 0;
    }

    for (i = 1; i < n; i++)
    {

        int m = min(z[i - l], r - i);
        z[i] = max(0, m);

        while (i + z[i] < n && str[z[i]] == str[i + z[i]])
        {
            z[i]++;
        }

        if (i + z[i] > r)
        {
            l = i;
            r = i + z[i];
        }
    }

    for (i = 0; i < n; i++)
    {
        fprintf(out, "%d ", z[i]);
    }

    // не забывыем освободить память у *str
    // free(str);
    free(z);
    fclose(in);
    fclose(out);

    return 0;
}