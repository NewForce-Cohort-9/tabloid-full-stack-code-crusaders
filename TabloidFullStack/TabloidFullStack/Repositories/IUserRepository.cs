﻿using TabloidFullStack.Models;

namespace TabloidFullStack.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
        List<UserProfile> GetAllUsers();
        UserProfile GetById(int id);
        int GetAdminCount();
        void DeactivateUser(int id);
        void ReactivateUser(int id);
        List<UserProfile> GetDeactivatedUsers();
        void UpdateUserType(UserProfile userProfile);
    }
}