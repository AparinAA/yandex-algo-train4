// #include<bits/stdc++.h>
#include <iostream>
#include <fstream>
#include <queue>
#include <vector>
#include <unordered_set>

#define ll = long long;

using namespace std;

bool dfs(vector<vector<int> > *adjs, vector<int> *visited, int curV, int parV)
{
    if (curV == parV)
    {
        return true;
    }

    visited->at(curV) = 1;

    for (int &v : adjs->at(curV))
    {
        if (!visited->at(v))
        {
            if (dfs(adjs, visited, v, curV))
            {
                return true;
            }
        }
    }

    return false;
}

bool isPath(int v1, int v2, vector<vector<int> > *adjs)
{
    vector<int> visited(adjs->size(), 0);
    return dfs(adjs, &visited, v1, v2);
}

void findAllComponents(vector<vector<int> > *adjs, vector<vector<int> > *ans)
{
    int n = adjs->size();

    vector<int> is_scc(n + 1, 0);

    for (int i = 1; i < n + 1; i++)
    {
        if (!is_scc[i])
        {
            vector<int> scc;

            scc.push_back(i);

            for (int j = i + 1; j < n + 1; j++)
            {

                if (!is_scc[j] && isPath(i, j, adjs) && isPath(j, i, adjs))
                {
                    is_scc[j] = 1;
                    scc.push_back(j);
                }
            }

            ans->push_back(scc);
        }
    }
}

int main(void)
{
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);

    int n, m;
    cin >> n >> m;

    int a, b, c;

    vector< vector<int> > adjs(n + 1);
    vector<int> visited(n + 1);

    for (int i = 0; i < m; i++)
    {
        cin >> a >> b;
        adjs[a].push_back(b);
        adjs[b].push_back(a);
    }

    vector< vector<int> > ans;
    // findAllComponents(&adjs, &ans);

    // cout << ans[0].size() << endl;

    // for (auto &a : ans)
    // {
    //     for (auto &x : a)
    //     {
    //         cout << x << " ";
    //     }
    //     cout << endl;
    // }
    return 0;
}